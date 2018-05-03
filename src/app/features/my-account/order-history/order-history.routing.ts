import { Routes } from '@angular/router';

export const orderHistoryRoutes: Routes = [
  {
    path: 'order-history',
    loadChildren: 'app/features/my-account/order-history/order-history.module#OrderHistoryModule'
  }
];

