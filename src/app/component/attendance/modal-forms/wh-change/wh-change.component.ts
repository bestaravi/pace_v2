import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-wh-change',
  templateUrl: './wh-change.component.html',
  styleUrls: ['./wh-change.component.scss']
})
export class WhChangeComponent implements OnInit {

  whForm: FormGroup;
  submitted = false;

  constructor(
    private _fb:FormBuilder,
    private _modal: NgbActiveModal,
    private _dataService: DataService
    ) { }

    fromDatePickersettings = {
      bigBanner: true,
      timePicker: false,
      format: 'dd-MM-yyyy',
      defaultOpen: false
  
    }
    toDatePickersettings = {
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
    this.whForm = this._fb.group({
      empCode: [this.user.empcode, Validators.required],
      empName: [this.user.emp_name, Validators.required],
      fDate: [null, Validators.required],
      tDate: [null, Validators.required],
      shift: ['', [Validators.required]],
      manager: ['', Validators.required],
      remarks: ['', Validators.requiredTrue]
  });
  this.shiftsData();
  this.getManager();
  }

  // convenience getter for easy access to form fields
get fv() { return this.whForm.controls; }

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
      this.whForm.patchValue({        
        manager: response[0].data[0].empcode
      });
      console.log(111, this.manager)
     }
  })
}

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.whForm.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.whForm.value, null, 4));
}

  modal(){
    this._modal.close();
  }
}
