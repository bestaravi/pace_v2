import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LeaveType, Login, UserInfo } from '../core/model';


const httpOptions = {
  headers: new HttpHeaders({
      'Accept': 'application/json;odata=verbose',
      'Content-Type': 'application/json;odata=verbose',
      'X-HTTP-Method': 'POST',
  })
};

const baseURL: string = environment.apiUrl;
const APIURL: string = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {

  constructor( private _http: HttpClient) { }

  ngOnInit(): void {
    
  }
  login(data): Observable<Login> {
    let url = baseURL+'/Employee/Login';
    return this._http.post<Login>(url, data,httpOptions);
  }
  leaveTypes(): Observable<any> {
    // data = {"Empcode":"10225","year":2022 }
    let url = APIURL+'/employee/GetLeaveTypes';
    // let url = './assets/mydata.json';
    
    console.log(APIURL,url)
    return this._http.get<LeaveType>(url,httpOptions);
    // return this._http.get<any>(url);
  }
  getLeaveBalence(data): Observable<any> {
    data = {"Empcode":"10225","year":2022 }
    let url = baseURL+'/Leaveob/GetLeaveOpeningBalance';
    return this._http.post<any>(url, data,httpOptions);
  }

  getManager(empCode): Observable<UserInfo> {
    let url = baseURL+'/employee/GetManagers/' + empCode;
    return this._http.get<any>(url, httpOptions);
  }
  //Attendance Request
  getAttendance(data){
    data = {"Empcode":"10225",
    "From_Date":"01-Jan-2022",
    "To_Date":"31-Jan-2022"
    }
    let url = baseURL+'/Attendance/GetAttendance';
    return this._http.post<any>(url, data, httpOptions);
  }
  getLeaveBalance(data){
    data = {"Empcode":"10225",
    "year":"2022"
    }
    let url = baseURL+'/Leaveob/GetLeaveOpeningBalance';
    return this._http.post<any>(url, data, httpOptions);
  }
  getShifts(data){
    let url = baseURL+'/employee/GetShifts/'+data;
    return this._http.get<any>(url);
  }
  
  getPendingLeaves(){
    let url = baseURL+'/leaveob/GetLeave_register_pending/13947';
    return this._http.get<any>(url);
  }
  getApprovalLeaves(data){
    let url = baseURL+'/leaveob/GetLeave_register_Approved';
    return this._http.post<any>(url, data, httpOptions);
  }
}
