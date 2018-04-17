import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesComponent } from './features.component';
import { SharedModule } from '../shared/module/shared.module';
import { dashboardRoutes } from './homepage/homepage.routing';
import { HeaderModule } from '../shared/layout/header/header.module';
import { FooterModule } from '../shared/layout/footer/footer.module';
import { productListRoutes } from './product/product-list/product-list.routing';
import { productDetailRoutes } from './product/product-detail/product-detail.routing';

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
      ...dashboardRoutes,
      ...productListRoutes,
      ...productDetailRoutes,
      {
        path: '**',
        redirectTo: 'homepage',
        pathMatch: 'full'
      }
    ]
    // children: [
    //   {
    //     path: 'error',
    //     canActivate: [],
    //     data: { withoutComp: true },
    //     children: [
    //       {
    //         path: '',
    //         pathMatch: 'full',
    //         loadChildren: 'app/features/error/error.module#ErrorModule'
    //       },
    //       {
    //         path: ':code',
    //         data: { isDetail: true },
    //         loadChildren: 'app/features/error/error.module#ErrorModule'
    //       }
    //     ]
    //   },
    // ]
  }
]

@NgModule({
  imports: [
    HeaderModule,
    FooterModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    FeaturesComponent
  ]
})

export class FeaturesModule { }