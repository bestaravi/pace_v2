import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import { PermissionComponent } from './modal-forms/permission/permission.component';
import { PunchForgotComponent } from './modal-forms/punch-forgot/punch-forgot.component';
import { ShiftChangeComponent } from './modal-forms/shift-change/shift-change.component';
import { SwipeForgotComponent } from './modal-forms/swipe-forgot/swipe-forgot.component';
import { WhChangeComponent } from './modal-forms/wh-change/wh-change.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  constructor(
    private _modalService:NgbModal, 
    private _http: HttpClient, 
    private _dataService: DataService) { }

  attendanceList=[]

  ngOnInit(): void {
    this.attendanceRequest();
  }

  attendanceRequest = () => {
    this._dataService.getAttendance(null).subscribe(res =>{
      console.log(res[0])
      if(res[0].status == 'success'){
        this.attendanceList = res[0].data;
      }
    })
  }

  openPunchModal(){
    const modal = this._modalService.open(PunchForgotComponent,{size:'lg'})
  }

  openSwipeModal(){
    const modal = this._modalService.open(SwipeForgotComponent,{size:'lg'})
  }

  openWHModal(){
    const modal = this._modalService.open(WhChangeComponent,{size:'lg'})
  }
  openShiftModal(){
    const modal = this._modalService.open(ShiftChangeComponent,{size:'lg'})
  }
  openPermissionModal(){
    const modal = this._modalService.open(PermissionComponent,{size:'lg'})
  }

  

  

}
