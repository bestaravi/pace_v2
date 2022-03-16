export interface Login{
    userid:string;
    pwd:string;

}

export interface UserInfo{
    accesslevel?:number;
    catg_code?:string;
    compcode?: string;
    dept_code?: string;
    empcode?: string;
    emp_name?: string;
    groupcode?: string;
    pwd?: string;
    sectcode?: string;
}

export interface LeaveType {
    leavecode? : string;
    leavename? : string;
}

export interface LeaveBalence {
    EmpCode?: string;
    YEAR?: number;
    SLOPBAL?:number;
    SLAVAIL?:number;
    CLAVAIL?: number;
    CLOPBAL?: number;
    ELOPBAL?: number;
    ELAVAIL?: number;
}