import { Routes } from '@angular/router';
import { Login } from './login/login';
import { authGuard } from './auth-service/authguard';
import { Component } from '@angular/core';
import { Tasks } from './tasks/tasks';

export const routes: Routes = [
    { path: 'login', component: Login },
    { 
        path: 'dashboard', 
        canActivate: [authGuard], 
        loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard)
    },
    { 
        path: 'register', 
        loadComponent: () => import('./register/register').then(m => m.Register)
    },
    {
        path: 'tasks',
        component: Tasks
    },

    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
