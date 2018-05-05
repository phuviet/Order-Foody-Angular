import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/module/shared.module';
import { AboutUsComponent } from './about-us.component';
import { GMapModule } from 'primeng/primeng';

const routes: Routes = [
  {
    path: '',
    component: AboutUsComponent
  }
]

@NgModule({
  imports: [
    SharedModule,
    GMapModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AboutUsComponent
  ]
})

export class AboutUsModule { }
