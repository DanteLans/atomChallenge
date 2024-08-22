import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { authGuard } from './auth.guard';
import { TaskStore } from '../services/task.service';
import { User } from '../../shared/types/task.type';

describe('AuthGuard', () => {
  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  let taskStore: TaskStore;

  class TaskServiceMock {
    _user= { email: '' } as User;
    
    userState(value: User) {
      this._user = value;
    }

    get user(): User {
      return this._user;
    }
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TaskStore, useClass: TaskServiceMock },
        { provide: Router, useValue: router },
      ]
    });
    taskStore = TestBed.inject(TaskStore);
  });

  it('should allow access when the user is logged in', async () => {
    taskStore.userState({ email: 'dalejandro.monzon@gmail.com' } as User);
    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = {} as any;
    const result = await TestBed.runInInjectionContext(() => authGuard(route, state));
    expect(result).toBe(true);
  });

  it('should redirect to login page if user is not logged in', async() => {
    taskStore.userState({ email:'' } as User);
    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = {} as any;
    const result = await TestBed.runInInjectionContext(() => authGuard(route, state));
    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
