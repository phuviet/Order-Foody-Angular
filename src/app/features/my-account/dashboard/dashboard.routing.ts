import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadChildren: 'app/features/my-account/dashboard/dashboard.module#MyAccountDashBoardModule'
  }
];
