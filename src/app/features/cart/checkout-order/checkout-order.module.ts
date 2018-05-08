import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/module/shared.module';
import { CheckoutOrderComponent } from './checkout-order.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { DialogModule, TabViewModule } from 'primeng/primeng';

const routes: Routes = [
  {
    path: '',
    component: CheckoutOrderComponent
  }
]

@NgModule({
  imports: [
    SharedModule,
    DialogModule,
    TabViewModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CheckoutOrderComponent
  ]
})

export class CheckOutOrderModule { }
