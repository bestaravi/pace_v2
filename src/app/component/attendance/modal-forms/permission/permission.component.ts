import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserInfo } from 'os';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {

  swipeForm: FormGroup;
  submitted = false;

  constructor(
    private _fb:FormBuilder,
    private _modal: NgbActiveModal,
    private _dataService: DataService) { }
  
    datePickersettings = {
      bigBanner: true,
      timePicker: false,
      format: 'dd-MM-yyyy',
      defaultOpen: false
  
    }
    user: any;
    shifts = [];
    manager =[];

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'))
    }
    this.swipeForm = this._fb.group({
      empCode: [this.user.empcode, Validators.required],
      empName: [this.user.emp_name, Validators.required],
      swipe: ['', Validators.required],
      date: [null, [Validators.required]],
      attendedShift: ['', [Validators.required]],
      lateHrs: ['', Validators.required],
      manager: ['', Validators.required],
      remarks: ['', Validators.requiredTrue]
  });
  this.shiftsData();
  this.getManager();
  }

  // convenience getter for easy access to form fields
  get fv() { return this.swipeForm.controls; }

  shiftsData = ()=>{
    this._dataService.getShifts(this.user.compcode).subscribe(res =>{
      if(res[0].status =='success'){
        this.shifts = res[0].data;
      }
    })
  }

  getManager = () =>{
    this._dataService.getManager(this.user.empcode).subscribe(response =>{
       if(response[0].status == 'success'){
        this.manager = response[0].data
        this.swipeForm.patchValue({        
          manager: response[0].data[0].empcode
        });
        console.log(111, this.manager)
       }
    })
  }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.swipeForm.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.swipeForm.value, null, 4));
}

  modal(){
    this._modal.close();
  }

}
