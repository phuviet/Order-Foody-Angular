import { Routes } from '@angular/router';

export const cartRoutes: Routes = [
  {
    path: 'cart',
    loadChildren: 'app/features/cart/cart.module#CartModule'
  }
];
