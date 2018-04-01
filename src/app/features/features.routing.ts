import { Routes } from '@angular/router';

export const featuresRoutes: Routes = [
  {
    path: '',
    loadChildren: 'app/features/features.module#FeaturesModule'
  }
];
