import { Routes } from '@angular/router';

export const productListRoutes: Routes = [
  {
    path: 'product-list/:id',
    loadChildren: 'app/features/product/product-list/product-list.module#ProductListModule'
  }
];
