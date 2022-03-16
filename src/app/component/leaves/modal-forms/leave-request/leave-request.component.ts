import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LeaveType, UserInfo } from 'src/app/core/model';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestComponent implements OnInit {

  leavesForm: FormGroup;
  submitted = false;
  // date: Date = new Date();
  datePickersettings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false

  }
  fromDatePicker = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false

  }
  toDatePicker = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false

  }
  leaveTypes:LeaveType[];

  sessions =[{
    "id":"1",
    "name":"First Session",
  },
  {
    "id":"2",
    "name":"Second Session",
  }];
  manager = []
  user: UserInfo = JSON.parse(localStorage.getItem('user'))

  constructor(
    private _fb:FormBuilder,
    private _modal: NgbActiveModal,
    private _dataService: DataService) { }

  ngOnInit(): void {
    
    this.getFormFeild();
    this.getLeaveTypes();
    this.getManager();
  }

  getFormFeild(){
    this.leavesForm = this._fb.group({
      empCode: [this.user.empcode, Validators.required],
      empName: [this.user.emp_name, Validators.required],
      leaveType: ['', Validators.required],
      date: [null, Validators.required],
      fsession: ['', Validators.required],
      tsession: ['', Validators.required],
      fromdate: [null, [Validators.required]],
      todate: [null, [Validators.required]],
      nod: ['', [Validators.required]],
      manager: ['', Validators.required],
      remarks: ['', Validators.requiredTrue]
    });
  }

  // convenience getter for easy access to form fields
get fv() { return this.leavesForm.controls; }

getLeaveTypes = () =>{
  this._dataService.leaveTypes().subscribe(data =>{
    console.log(111, data[0].data)

    if(data[0].status == 'success')
    this.leaveTypes = data[0].data
    console.log(111, this.leaveTypes)

  })
   
}

getManager = () =>{
  this._dataService.getManager(this.user.empcode).subscribe(response =>{
     if(response[0].status == 'success'){
      this.manager = response[0].data;
      this.leavesForm.patchValue({        
        manager: response[0].data[0].empcode
      });
     }
  })
}

onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    console.log(this.leavesForm.value)
    if (this.leavesForm.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.leavesForm.value, null, 4));
}

  modal(){
    this._modal.close();
  }

}
