import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/module/shared.module';
import { ProductListComponent } from './product-list.component';
import { DropdownModule, PaginatorModule, SliderModule, RatingModule } from 'primeng/primeng';
import { SidebarModule } from '../../../shared/layout/sidebar/sidebar.module';


const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  }
]

@NgModule({
  imports: [
    SharedModule,
    DropdownModule,
    PaginatorModule,
    SliderModule,
    SidebarModule,
    RatingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProductListComponent
  ]
})

export class ProductListModule { }
