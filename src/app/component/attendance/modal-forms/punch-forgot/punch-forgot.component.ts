import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-punch-forgot',
  templateUrl: './punch-forgot.component.html',
  styleUrls: ['./punch-forgot.component.scss']
})
export class PunchForgotComponent implements OnInit {

  punchForm: FormGroup;
  submitted = false;

  constructor(
    private _modal: NgbActiveModal,
    private _fb: FormBuilder,
    private _dataService: DataService
    ) { }

  datePickersettings = {
      bigBanner: true,
      timePicker: false,
      format: 'dd-MM-yyyy',
      defaultOpen: false
  
    }
  user: any;
  shifts = [];
  manager =[];

  ngOnInit() {
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'))
    }
    this.punchForm = this._fb.group({
        empCode: [this.user.empcode, Validators.required],
        empName: [this.user.emp_name, Validators.required],
        pfDate: [null, [Validators.required]],
        swift: ['', Validators.required],
        inTime: ['', [Validators.required]],
        outTime: ['', Validators.required],
        manager: ['', Validators.required],
        remarks: ['', Validators.requiredTrue]
    });
    this.shiftsData();
    this.getManager();
}

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
      this.punchForm.patchValue({        
        manager: response[0].data[0].empcode
      });
      console.log(111, this.manager)
     }
  })
}

// convenience getter for easy access to form fields
get fv() { return this.punchForm.controls; }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.punchForm.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.punchForm.value, null, 4));
}

  modal(){
    this._modal.close();
  }
}
