import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-shift-change',
  templateUrl: './shift-change.component.html',
  styleUrls: ['./shift-change.component.scss']
})
export class ShiftChangeComponent implements OnInit {

  shiftForm: FormGroup;
  submitted = false;
  user: any;
  shifts = [];
  manager =[];

  datePickersettings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false

  }
  constructor(
    private _fb:FormBuilder,
    private _modal: NgbActiveModal,
    private _dataService: DataService) { }

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'))
    }
    this.shiftForm = this._fb.group({
      empCode: [this.user.empcode, Validators.required],
      empName: [this.user.emp_name, Validators.required],
      date: [null, Validators.required],
      attendedSwift: ['', Validators.required],
      toShift: ['', [Validators.required]],
      manager: ['', Validators.required],
      remarks: ['', Validators.requiredTrue]
    });
    this.shiftsData();
    this.getManager();
  }

  // convenience getter for easy access to form fields
  get fv() { return this.shiftForm.controls; }

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
        this.manager = response[0].data;
        this.shiftForm.patchValue({        
          manager: response[0].data[0].empcode
        });
        console.log(111, this.manager)
       }
    })
  }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.shiftForm.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.shiftForm.value, null, 4));
}

  modal(){
    this._modal.close();
  }
}
