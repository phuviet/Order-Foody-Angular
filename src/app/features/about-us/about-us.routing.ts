import { Routes } from '@angular/router';

export const aboutUsRoutes: Routes = [
  {
    path: 'about-us',
    loadChildren: 'app/features/about-us/about-us.module#AboutUsModule'
  }
];
