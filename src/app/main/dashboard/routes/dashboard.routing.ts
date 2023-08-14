import { Routes } from '@angular/router';
import {DashboardDemoComponent} from "../components/dashboarddemo.component";
import {AuthGuard} from "../../../_guards/auth.guard";

export const RUTA_DASHBOARD: Routes = [
  {
    path: 'dashboard',
    component: DashboardDemoComponent,
    canActivate: [AuthGuard],
  },

];
