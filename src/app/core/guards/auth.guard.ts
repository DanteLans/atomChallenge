import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TaskStore } from '../services/task.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(TaskStore);
  const router = inject(Router);

    if (!authService.user.email) {
        router.navigate(['']);
        return false;
    }

    return true;
};
