import { provideHttpClient } from "@angular/common/http";
import { TaskStore } from "./task.service";
import { TestBed } from "@angular/core/testing";
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from "../../../environments/environment.development";
import { mockTask } from "./task.mock";
import { Task, User } from "../../shared/types/task.type";
import { provideToastr, ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { take } from "rxjs";

describe('TaskStore', () => {
    let service: TaskStore;
    let httpTesting: HttpTestingController;
    let toastr: ToastrService;
    let router = {
        navigate: jasmine.createSpy('navigate')
    }
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TaskStore, provideToastr({ maxOpened: 2, autoDismiss: true, timeOut: 2500 }),
                provideHttpClient(),
                provideHttpClientTesting(),
                { provide: Router, useValue: router }
            ],
        });
        httpTesting = TestBed.inject(HttpTestingController);
        service = TestBed.inject(TaskStore);
        toastr = TestBed.inject(ToastrService);
    });


    
    it('it should retrieve a list of all tasks', () => {
        const setStateSpy = spyOn(service, 'setState').and.callThrough();
        service.setInitialData();
        service.loadingState$
        .pipe(take(1))
        .subscribe((loading) => {
            expect(loading).toBeTruthy();
        });
        const req = httpTesting.match(`${environment.apiUrl}${environment.taskList}`)[1];
        expect(req.request.method).toBe('GET');
        req.flush(mockTask);
        expect(setStateSpy).toHaveBeenCalledWith(mockTask as unknown as Task[]);
        service.loadingState$
        .pipe(take(1))
        .subscribe((loading) => {
            expect(loading).toBeFalse();
        });
    });

    it('should handle error when setting initial data', () => {
        const setStateSpy = spyOn(service, 'setState').and.callThrough();
        service.loadingState$
        .pipe(take(1))
        .subscribe((loading) => {
            expect(loading).toBeTruthy();
        });
        const req = httpTesting.expectOne(`${environment.apiUrl}${environment.taskList}`);
        req.flush('Failed!', {status: 500, statusText: 'Internal Server Error'});       
        service.loadingState$
        .pipe(take(1))
        .subscribe((loading) => {
            expect(loading).toBeFalse();
        });
    });

    it('should update task and handle success', () => {
        const updatedTask  = { id: 'xxxx', title: 'Updated Task' } as Task;
        const spyShowMessage = spyOn(toastr, "info");
        service.updateTask(updatedTask);
        service.loadingState$
        .pipe(take(1))
        .subscribe((loading) => {
            expect(loading).toBeTruthy();
        });
        const req = httpTesting.expectOne(`${environment.apiUrl}${environment.updateTask(updatedTask.id!)}`);
        expect(req.request.method).toBe('PUT');  
        req.flush(updatedTask);

        service.loadingState$
        .pipe(take(1))
        .subscribe((loading) => {
            expect(loading).toBeFalse();
        });
        expect(spyShowMessage).toHaveBeenCalledWith('Tarea actualizada');
    });
    it('should handle error when updating task', () => {
        const updatedTask  = { id: 'xxxx', title: 'Updated Task' } as Task;
        const spyShowMessage = spyOn(toastr, "error");
        service.updateTask(updatedTask);
  
        const req = httpTesting.expectOne(`${environment.apiUrl}${environment.updateTask(updatedTask.id!)}`);
        expect(req.request.method).toBe('PUT');  
        req.flush('Failed!', {status: 500, statusText: 'Internal Server Error'});

        service.loadingState$
        .pipe(take(1))
        .subscribe((loading) => {
            expect(loading).toBeFalse();
        });
        expect(spyShowMessage).toHaveBeenCalledWith('Hubo un error al actualizar la tarea');
    });
    it('should get user successfully', () => {
        const mockUser  ={ email: 'ale@gmail.com' } as User;
        const spyShowMessage = spyOn(toastr, "success");
        service.getUser(mockUser);
  
        const req = httpTesting.expectOne(`${environment.apiUrl}${environment.getUser(mockUser.email)}`);
        expect(req.request.method).toBe('GET'); 
        req.flush(mockUser);

        service.loadingState$
        .pipe(take(1))
        .subscribe((loading) => {
            expect(loading).toBeFalse();
        });
        expect(service.user.email).toBe('ale@gmail.com'); 
        expect(spyShowMessage).toHaveBeenCalledWith('Usuario encontrado!');
    });

    it('should handle error when getting user and create a new user', () => {
        const mockUser  ={ email: 'ale@gmail.com' } as User;
        const spyShowMessage = spyOn(toastr, "error");
        const spyService = spyOn(service, "createUser");
        service.getUser(mockUser);
  
        const req = httpTesting.expectOne(`${environment.apiUrl}${environment.getUser(mockUser.email)}`);
        expect(req.request.method).toBe('GET'); 
        req.flush('Failed!', {status: 404, statusText: 'User not found'});
        expect(spyService).toHaveBeenCalledWith(mockUser, undefined);
        expect(service.user.email).toBe('ale@gmail.com');
        expect(spyShowMessage).toHaveBeenCalledWith('Usuario no encontrado!');
    });
});