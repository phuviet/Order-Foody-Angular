import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/module/shared.module';
import { OrderHistoryComponent } from './order-history.component';
import { AccordionModule } from 'primeng/primeng';


const routes: Routes = [
  {
    path: '',
    component: OrderHistoryComponent
  }
]

@NgModule({
  imports: [
    SharedModule,
    AccordionModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    OrderHistoryComponent
  ]
})

export class OrderHistoryModule { }
