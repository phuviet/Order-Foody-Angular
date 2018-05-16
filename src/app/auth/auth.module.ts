import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/module/shared.module';
import { AuthComponent } from './auth.component';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ErrorModule } from '../shared/partial/error/error.module';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        loadChildren: 'app/auth/login/login.module#LoginModule'
      },
      {
        path: 'register',
        loadChildren: 'app/auth/register/register.module#RegisterModule'
      },
      {
        path: 'confirm-register',
        loadChildren: 'app/auth/confirm-register/confirm-register.module#ConfirmRegisterModule'
      }
      // {
      //   path: 'reset-password',
      //   children: [
      //     {
      //       path: '',
      //       pathMatch: 'full',
      //       loadChildren: 'app/auth/reset-password/reset-password.module#ResetPasswordModule'
      //     },
      //     {
      //       path: ':digest',
      //       loadChildren: 'app/auth/reset-password/reset-password.module#ResetPasswordModule'
      //     }
      //   ]
      // }
    ]
  }
]

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    ErrorModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }

