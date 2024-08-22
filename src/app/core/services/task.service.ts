import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, delay, distinctUntilChanged, map, take, throwError } from "rxjs";
import { Task, Response, GroupedTasks, StatusTask, User } from "../../shared/types/task.type";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from "../../../environments/environment.development";
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class TaskStore {
  private _state: BehaviorSubject<Task[]>;
  private _user: BehaviorSubject<User>;
  private _loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {
    const sessionUser = sessionStorage.getItem('email');
    const user = { email: sessionUser } as User;
    this._state = new BehaviorSubject<Task[]>([]);

    if (sessionUser) {
      this._user = new BehaviorSubject(user)
    } else {
      this._user = new BehaviorSubject({} as User)
    }

    this.setInitialData();
  }

  setInitialData(): void {
    this._loading.next(true);
    this.http.get<Task[]>(environment.apiUrl + environment.taskList)
      .pipe(take(1))
      .subscribe({
        next: (task) => {
          this.setState(task);
        },
        complete: () => {
          this._loading.next(false);
        },
        error: () => {
          this._loading.next(false);
        }
      });
  }

  updateTask(item: Task): void {
    this._loading.next(true);
    this.http.put<Task>(environment.apiUrl + environment.updateTask(item.id!), item)
      .pipe(take(1))
      .pipe(
        catchError(error => {
          throw new Error(error.error);
        }))
      .subscribe({
        error: (e) => {
          this._loading.next(false);
          this.toastr.error('Hubo un error al actualizar la tarea');
        },
        complete: () => {
          this.toastr.info('Tarea actualizada');
          this.setInitialData();
          this._loading.next(false);
        }
      })
  }

  createTask(item: Task): void {
    this._loading.next(true);
    this.http.post<Task>(environment.apiUrl + environment.taskList, item)
      .pipe(take(1))
      .pipe(
        catchError(error => {
          throw new Error(error.error);
        }))
      .subscribe({
        next: () => {
          this.toastr.success('Tarea creada correctamente');
        },
        error: (e) => {
          this._loading.next(false);
          this.toastr.error('Hubo un error al actualizar la tarea');
        },
        complete: () => {
          this._loading.next(false);
          this.setInitialData();
        }
      })
  }

  deleteTask(item: Task): void {
    this._loading.next(true);
    this.http.delete<Task>(environment.apiUrl + environment.updateTask(item.id!))
      .pipe(take(1))
      .pipe(
        catchError(error => {
          throw new Error(error.error);
        }))
      .subscribe({
        next: () => {
          this.toastr.info('Tarea eliminada correctamente');
        },
        error: (e) => {
          this._loading.next(false);
          this.toastr.error('Hubo un error al eliminar la tarea');
        },
        complete: () => {
          this._loading.next(false);
          this.setInitialData();
        }
      })
  }

  getUser(user: User, tour?: boolean): void {
    this._loading.next(true);
    this.http.get<User>(environment.apiUrl + environment.getUser(user.email))
      .pipe(take(1))
      .pipe(
        catchError(error => {
          throw new Error(error.error);
        }))
      .subscribe({
        next: (value) => {
          this._user.next(value);
        },
        error: (e) => {
          this._loading.next(false);
          this.toastr.error('Usuario no encontrado!');
          this.createUser(user, tour);
        },
        complete: () => {
          this._loading.next(false);
          this.userState(user as User);
          this.toastr.success('Usuario encontrado!');
          this.router.navigate(['/home'], { queryParams: {tour}});
        }
      })
  }

  createUser(user: Pick<User, 'email'>, tour?: boolean): void {
    this._loading.next(true);
    this.http.post(environment.apiUrl + environment.users, { email: user.email })
      .pipe(take(1))
      .pipe(
        catchError(error => {
          throw new Error(error.error);
        }))
      .subscribe({
        error: (e) => {
          console.error(e);
          this.toastr.error('Error al intentar crear el usuario');
          this._loading.next(false)
        },
        complete: () => {
          this._loading.next(false);
          this.userState(user as User);
          this.toastr.success('Usuario creado!');
          this.router.navigate(['/home'], { queryParams: {tour}});
        }
      })
  }

  get state$(): Observable<Task[]> {
    return this._state.asObservable();
  }

  get loadingState$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  set loadingState$(value: boolean) {
    this._loading.next(value);
  }

  get userState$(): Observable<User> {
    return this._user.asObservable();
  }

  userState(value: User) {
    if (value.email) {
      sessionStorage.setItem('email', value.email);
    } else {
      sessionStorage.removeItem('email')
    }

    this._user.next(value);
  }

  get user(): User {
    return this._user.getValue();
  }

  get state(): Task[] {
    return this._state.getValue();
  }


  setState(data: Task[]): void {
    this._state.next([...data]);
  }

  groupByStatus(tasks: Task[]) {
    const data = {} as GroupedTasks
    tasks.forEach((item: any) => {
      const key = item.status as string;
      if (!(key in data)) {
        data[key as StatusTask] = [];
      }
      data[key as StatusTask].push(item)
    });
    return data;
  }
}
