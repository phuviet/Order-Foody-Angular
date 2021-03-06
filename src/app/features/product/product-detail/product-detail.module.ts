import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/module/shared.module';
import { ProductDetailComponent } from './product-detail.component';
import { DropdownModule, SliderModule, RatingModule } from 'primeng/primeng';
import { SidebarModule } from '../../../shared/layout/sidebar/sidebar.module';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailComponent
  }
]

@NgModule({
  imports: [
    SharedModule,
    DropdownModule,
    SliderModule,
    SidebarModule,
    RatingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProductDetailComponent
  ]
})

export class ProductDetailModule { }
