import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/module/shared.module';
import { CartComponent } from './cart.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: CartComponent
  }
]

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CartComponent
  ]
})

export class CartModule { }
