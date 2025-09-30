import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'requests',
    loadComponent: () => import('./pages/requests/requests').then(m => m.Requests)
  },
  {
    path: 'request/:id',
    loadComponent: () => import('./pages/request/request').then(m => m.Request)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound)
  },
];
