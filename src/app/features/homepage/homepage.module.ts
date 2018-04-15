import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/module/shared.module';
import { HomepageComponent } from './homepage.component';
import { DropdownModule } from 'primeng/primeng';
import { SidebarModule } from '../../shared/layout/sidebar/sidebar.module';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  }
]

@NgModule({
  imports: [
    SharedModule,
    DropdownModule,
    SidebarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomepageComponent
  ]
})

export class HomePageModule { }
