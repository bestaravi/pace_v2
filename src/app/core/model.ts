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
    compdesc?:string;
    deptdesc?:string;
    imagename?:string;
    
}

export interface LeaveType {
    leavecode? : string;
    leavename? : string;
}

export interface LeaveBalence {
    clavail?: number;
    clopbal?: number;
    elavail?: number;
    elopbal?: number;
    empcode?: string;
    slavail?: number;
    slopbal?: number;
    closingbal?: number;
    year?: number;
}