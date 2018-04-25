import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        loadChildren: 'app/auth/login/login.module#LoginModule'
      },
      // {
      //   path: 'forgot-password',
      //   loadChildren: 'app/auth/forgot-password/forgot-password.module#ForgotPasswordModule'
      // },
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
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }

