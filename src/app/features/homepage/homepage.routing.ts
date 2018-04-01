import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: 'homepage',
    loadChildren: 'app/features/homepage/homepage.module#HomePageModule'
  }
];
