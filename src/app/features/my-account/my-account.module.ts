import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/module/shared.module';
import { MyAccountComponent } from './my-account.component';

import { myProfileRoutes } from './my-profile/my-profile.routing';
import { dashboardRoutes } from './dashboard/dashboard.routing';
import { changePasswordRoutes } from './change-password/change-password.routing';

const routes: Routes = [
  {
    path: '',
    component: MyAccountComponent,
    children: [
      ...dashboardRoutes,
      ...myProfileRoutes,
      ...changePasswordRoutes
    ]
  }
]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MyAccountComponent
  ]
})

export class MyAccountModule { }
