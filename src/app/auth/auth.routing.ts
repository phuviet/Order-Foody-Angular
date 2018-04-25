import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule'
  }
];

