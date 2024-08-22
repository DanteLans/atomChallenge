import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'home',
        pathMatch: 'full',
        loadComponent: () => import('./features/home/home.component').then(mod => mod.HomeComponent),
        canActivate: [authGuard],
        title: 'Home'
    },
    {
        path: 'login',
        pathMatch: 'full',
        loadComponent: () => import('./features/login/login.component').then(mod => mod.LoginComponent),
        title:'Login'
    },
    {
        path: '**',
        loadComponent: () => import('./features/login/login.component').then(mod => mod.LoginComponent),
        title:'Login'
    },
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./features/login/login.component').then(mod => mod.LoginComponent),
        title:'Login'
    }
];
