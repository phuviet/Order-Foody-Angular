import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { SharedModule } from '../../../shared/module/shared.module';
import { MyProfileComponent } from './my-profile.component';
import { CalendarModule, FileUploadModule } from 'primeng/primeng';

const routes: Routes = [
  {
    path: '',
    component: MyProfileComponent
  }
]

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    FileUploadModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MyProfileComponent
  ]
})

export class MyProfileModule { }
