import { Routes } from '@angular/router';

export const changePasswordRoutes: Routes = [
  {
    path: 'change-password',
    loadChildren: 'app/features/my-account/change-password/change-password.module#ChangePasswordModule'
  }
];
