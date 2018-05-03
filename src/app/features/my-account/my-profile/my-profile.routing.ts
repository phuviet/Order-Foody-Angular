import { Routes } from '@angular/router';

export const myProfileRoutes: Routes = [
  {
    path: 'profile',
    loadChildren: 'app/features/my-account/my-profile/my-profile.module#MyProfileModule'
  }
];
