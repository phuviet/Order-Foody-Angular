import { Routes } from '@angular/router';

export const productDetailRoutes: Routes = [
  {
    path: 'product-detail/:id',
    loadChildren: 'app/features/product/product-detail/product-detail.module#ProductDetailModule'
  }
];
