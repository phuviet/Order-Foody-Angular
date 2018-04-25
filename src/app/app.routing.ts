import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from '@angular/router';
import { featuresRoutes } from './features/features.routing';
import { authRoutes } from './auth/auth.routing';

const routes: Routes = [
  ...featuresRoutes,
  ...authRoutes
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
