import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  apiUrl = environment.apiUrl;
  userInfo:any={};
  constructor(
    private _fb:FormBuilder,
    private _dataService: DataService,
    private _router: Router) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      userid: ['', Validators.required],
      pwd: ['', Validators.required],
  });

  }

  // convenience getter for easy access to form fields
get fv() { return this.loginForm.controls; }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    const passData = JSON.stringify(this.loginForm.value)
    console.log(39,passData)
    this._dataService.login(passData).subscribe(data => {
      console.log(44,data)

      if(data[0].status == '"success"')
      // alert('success')
      this.userInfo = data[0].data[0];
      console.log(46,data[0].data[0])
      console.log(47,this.userInfo)
      localStorage.setItem("user", JSON.stringify(data[0].data[0]))
      this._router.navigate(['/dashboard'])
    })

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
}


}
