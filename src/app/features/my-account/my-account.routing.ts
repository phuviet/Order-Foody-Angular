import { Routes } from '@angular/router';

export const myAccountRoutes: Routes = [
  {
    path: 'my-account',
    loadChildren: 'app/features/my-account/my-account.module#MyAccountModule'
  }
];
