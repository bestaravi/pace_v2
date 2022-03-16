import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { TodoComponent } from './apps/todo-list/todo/todo.component';
import { TodoRtlComponent } from './apps/todo-list/todo-rtl/todo-rtl.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { TodoListComponent } from './apps/todo-list/todo-list.component';
import { RtlComponent } from './rtl/rtl.component';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { LeavesComponent } from './component/leaves/leaves.component';
import { LeaveRequestComponent } from './component/leaves/modal-forms/leave-request/leave-request.component';
import { LeaveBalanceComponent } from './component/leaves/modal-forms/leave-balance/leave-balance.component';
import { LoginComponent } from './component/login/login.component';
import { AttendanceComponent } from './component/attendance/attendance.component';
import { PunchForgotComponent } from './component/attendance/modal-forms/punch-forgot/punch-forgot.component';
import { SwipeForgotComponent } from './component/attendance/modal-forms/swipe-forgot/swipe-forgot.component';
import { ShiftChangeComponent } from './component/attendance/modal-forms/shift-change/shift-change.component';
import { WhChangeComponent } from './component/attendance/modal-forms/wh-change/wh-change.component';
import { PermissionComponent } from './component/attendance/modal-forms/permission/permission.component';
// import { LeaveBalanceComponent } from './leaves/modal-forms/leave-balance/leave-balance.component';
// import { LeaveRequestComponent } from './leaves/modal-forms/leave-request/leave-request.component';
// import { LeavesComponent } from './leaves/leaves.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    TodoComponent,
    TodoRtlComponent,
    TodoListComponent,
    SpinnerComponent,
    ContentAnimateDirective,
    RtlComponent,
    LoginComponent,  
    LeavesComponent,
    LeaveRequestComponent,
    LeaveBalanceComponent,
    AttendanceComponent,
    PunchForgotComponent,
    SwipeForgotComponent,
    ShiftChangeComponent,
    WhChangeComponent,
    PermissionComponent
    // LeaveBalanceComponent,
    // LeaveRequestComponent,
    // LeavesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
    }),
    AngularDateTimePickerModule,
    AmazingTimePickerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    LeaveBalanceComponent, 
    LeaveRequestComponent,
    PunchForgotComponent,
    ShiftChangeComponent,
    WhChangeComponent,
    SwipeForgotComponent,
    PermissionComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
