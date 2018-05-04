import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/module/shared.module';
import { ConfirmRegisterComponent } from './confirm-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component:  ConfirmRegisterComponent
  },
];

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConfirmRegisterComponent]
})
export class ConfirmRegisterModule { }
