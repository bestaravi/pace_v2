import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-leave-balance',
  templateUrl: './leave-balance.component.html',
  styleUrls: ['./leave-balance.component.scss']
})
export class LeaveBalanceComponent implements OnInit {

  leaveBalenceData= []
  constructor(
    private _http: HttpClient,
    private _modal: NgbActiveModal,
    private _dataService: DataService
    ) { }

  ngOnInit(): void {
    this._dataService.getLeaveBalance("passData").subscribe(data => {

      if(data[0].status == "success")
      // alert('success')
      this.leaveBalenceData = data[0].data;
      console.log(46,this.leaveBalenceData)
      // localStorage.setItem("user", JSON.stringify(data[0].Data[0]))
      // this._router.navigate(['/dashboard'])
    })
  }

  modal(){
    this._modal.close();
  }

}
