import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendanceComponent } from './component/attendance/attendance.component';
import { LeavesComponent } from './component/leaves/leaves.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RtlComponent } from './rtl/rtl.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'leaves', component: LeavesComponent },
  { path: 'attendance', component: AttendanceComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'rtl', component: RtlComponent },
  // { path: 'basic-ui', loadChildren: () => import('./basic-ui/basic-ui.module').then(m => m.BasicUiModule) },
  // { path: 'advanced-ui', loadChildren: () => import('./advanced-ui/advanced-ui.module').then(m => m.AdvancedUiModule) },
  // { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsDemoModule) },
  // { path: 'forms', loadChildren: () => import('./forms/form.module').then(m => m.FormModule) },
  // { path: 'editors', loadChildren: () => import('./editors/editors.module').then(m => m.EditorsModule) },
  // { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  // { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  // { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) },
  // { path: 'general-pages', loadChildren: () => import('./general-pages/general-pages.module').then(m => m.GeneralPagesModule) },
  // { path: 'ecommerce', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
  // { path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
  // { path: 'user-pages', loadChildren: () => import('./user-pages/user-pages.module').then(m => m.UserPagesModule) },
  // { path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
