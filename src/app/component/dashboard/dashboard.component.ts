import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit,Inject,
  LOCALE_ID  } from '@angular/core';
import { userInfo } from 'os';
import { LeaveBalence, UserInfo } from 'src/app/core/model';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  person: UserInfo;
  birthDayList =[];
  holidayList =[];
  absentList =[];
  attendanceToBeRegularze =[];
  today = new Date().getHours();
  greeting;
  currentDate = new Date();
  toDate;
  fromDate;
  attendanceList = [];
  isAttendanceLoading:boolean = false;
  presentDaysCount = 0;
  absentDaysCount = 0;
  leaveBalenceData :LeaveBalence;
  cyAbsent = []
  cyLeaves = []
  cyPresentdays = []
  cyAttendance = []
  cyMonths = []
  visitSaleChartData = [];
  visitSaleChartLabels = [];
  visitSaleChartOptions = {};visitSaleChartColors = []
  currentMonthData : any;
  isLeaveBalence :boolean = false;
  constructor(
    private _dataService: DataService,
    @Inject(LOCALE_ID) public locale: string
  ) { }

  ngOnInit() {

    if((localStorage.getItem('user'))){
      if (this.today < 12) {
        this.greeting = "Good Morning"
      } else if (this.today < 18) {
        this.greeting = "Good Afternoon"
      } else {
        this.greeting = "Good Evening"
      }
      
      this.person = JSON.parse(localStorage.getItem('user'))
      this._dataService.fetchBirthDayList(this.person.compcode).subscribe(res =>{
        if(res[0].status == 'success'){
          this.birthDayList = res[0].data
        }
        // console.log('Response',res)
      })
      this.getHolidayList();
      this.getTeamAbsent();
      this.getPresentAbsentDays();
      this.getLeaveBal();
      this.getCurrentYearAttedance();
    }
  }


  getHolidayList =()=>{
    this._dataService.fetchHolidayList(this.person.compcode).subscribe(res =>{
      if(res[0].status == 'success'){
        this.holidayList = res[0].data
      }
      // console.log(44,this.holidayList)
    })
  }

  getTeamAbsent =()=>{
    this._dataService.fetchTeamAbsentList(this.person.compcode).subscribe(res =>{
      if(res[0].status == 'success'){
        this.absentList = res[0].data
      }
      // console.log('Response',res)
    })
  }

  getPresentAbsentDays = ()=>{
    this.currentDate.setDate(this.currentDate.getDate() - 45);
      var dateString = this.currentDate.toISOString().split('T')[0];
      this.toDate = formatDate(new Date(), 'dd-MMM-yyyy' ,this.locale);
      this.fromDate = formatDate(new Date(dateString), 'dd-MMM-yyyy' ,this.locale);
      // console.log(75,this.toDate, this.fromDate)

      let data = {
        "Empcode":this.person.empcode,
        "From_Date":this.fromDate,
        "To_Date":this.toDate
      }
      this._dataService.getAttendance(data).subscribe(res =>{
        this.isAttendanceLoading = true;
        // res[0].data = null;
        if(res[0].status == 'success')
          if(res[0].data == null || res[0].message == "No Records Found"){
            this.isAttendanceLoading = false;
            this.attendanceList = []
          }else{
            this.isAttendanceLoading = false;
            this.attendanceList = res[0].data
            if(this.attendanceList.length >0){
              for(const x in this.attendanceList){
                if(this.attendanceList[x].status == 'AA' || this.attendanceList[x].status == 'AX'|| this.attendanceList[x].status == 'XA'){
                  this.attendanceToBeRegularze.push(this.attendanceList[x])
                  this.absentDaysCount++;
                }else{
                  this.presentDaysCount++
                }
              }
            }
            // if(this.absentDaysCount<10){
            //   this.absentDaysCount = '0'+this.absentDaysCount.toString
            // }
          }
        // console.log(108,this.presentDaysCount,this.absentDaysCount,res)
      })
  }

  getLeaveBal(){
    this._dataService.getLeaveBalance("passData").subscribe(data => {

      if(data[0].status == "success")
      // alert('success')
      if(data[0].data.length > 0){
        this.isLeaveBalence = true;
        this.leaveBalenceData = data[0].data[0];
        // this.leaveBalenceData.clclobal = this.leaveBalenceData.clavail-this.leaveBalenceData.clopbal

      }else{
        this.leaveBalenceData = {}
        this.isLeaveBalence = true;
      }
     
    })
  }

  getCurrentYearAttedance=()=>{
    const cyAbsent = []
    const cyLeaves = []
    const cyPresentdays = []
    const months = []
    const currentMonth = formatDate(new Date(), 'MMMM' ,this.locale);
    // const presentMonth = this.fromDate = formatDate((new Date().getMonth() + 1).toString() + '-' + new Date().getFullYear().toString(), 'MMM-yyyy' ,this.locale);
    // console.log(152,currentMonth)

    this._dataService.fetchCYAttendance(this.person.empcode).subscribe(data => {
      // console.log(data[0])
      if(data[0].status == "success")
      if(data[0].data.length > 0){
        this.cyAttendance = data[0].data;
        // console.log(146,this.cyAttendance)
        for( const item in this.cyAttendance){
          if(currentMonth == this.cyAttendance[item].month){
            this.cyAttendance[item].presentdays = parseInt(this.cyAttendance[item].presentdays)
            this.cyAttendance[item].absent = parseInt(this.cyAttendance[item].absent)
            this.cyAttendance[item].leaves = parseInt(this.cyAttendance[item].leaves)
            this.currentMonthData = this.cyAttendance[item]
          }
          cyAbsent.push(parseInt(this.cyAttendance[item].absent))
          cyLeaves.push(parseInt(this.cyAttendance[item].leaves))
          cyPresentdays.push(parseInt(this.cyAttendance[item].presentdays))
          months.push(this.cyAttendance[item].month)
          
        }
        // this.cyAbsent = cyAbsent;
        // this.cyLeaves = cyLeaves
        // this.cyPresentdays = cyPresentdays
        // this.cyMonths = months
        
        this.getDashboardGraph(cyAbsent,cyLeaves,cyPresentdays,months)
      }else{
        this.cyAttendance = []
      }
    //  console.log(178, this.currentMonthData)
    })
  }

  getDashboardGraph(cyAbsent,cyLeaves,cyPresentdays,months){
    console.log(cyAbsent,cyLeaves,cyPresentdays,months)
    this.visitSaleChartData = [
      {
        label: 'Presentdays',
        data: cyPresentdays,
        borderWidth: 1,
        fill: false,
      },
      {
      label: 'Absent',
      data: cyAbsent,
      borderWidth: 1,
      fill: false,
    },
    {
      label: 'Leaves',
      data: cyLeaves,
      borderWidth: 1,
      fill: false,
    }
    ];
  
    this.visitSaleChartLabels = months;
  
    this.visitSaleChartOptions = {
      responsive: true,
      legend: false,
      scales: {
          yAxes: [{
              ticks: {
                  display: false,
                  min: 0,
                  stepSize: 20,
                  max: 31
              },
              gridLines: {
                drawBorder: false,
                color: 'rgba(235,237,242,1)',
                zeroLineColor: 'rgba(235,237,242,1)'
              }
          }],
          xAxes: [{
              gridLines: {
                display:false,
                drawBorder: false,
                color: 'rgba(0,0,0,1)',
                zeroLineColor: 'rgba(235,237,242,1)'
              },
              ticks: {
                  padding: 20,
                  fontColor: "#9c9fa6",
                  autoSkip: true,
              },
              categoryPercentage: 0.6,
              barPercentage: 0.6
          }]
        }
    };
  
    this.visitSaleChartColors = [
      {
        backgroundColor: [
          'rgba(41, 215, 119, 1)',
          'rgba(41, 215, 119, 1)',
          'rgba(41, 215, 119, 1)',
          'rgba(41, 215, 119, 1)',
          'rgba(41, 215, 119, 1)',
          'rgba(41, 215, 119, 1)',
          'rgba(41, 215, 119, 1)',
          'rgba(41, 215, 119, 1)',
          'rgba(41, 215, 119, 1)',
          'rgba(41, 215, 119, 1)',
          'rgba(41, 215, 119, 1)',
          'rgba(41, 215, 119, 1)',
          // 'rgba(154, 85, 255, 1)',
          // 'rgba(154, 85, 255, 1)',
          // 'rgba(154, 85, 255, 1)',
          // 'rgba(154, 85, 255, 1)',
          // 'rgba(154, 85, 255, 1)',
        ],
        borderColor: [
          'rgba(41, 215, 119, 1)',
          'rgba(41, 215, 119, 1)',
          'rgba(41, 215, 119, 1)',
          'rgba(41, 215, 119, 1)',
          'rgba(41, 215, 119, 1)',
          'rgba(41, 215, 119, 1)',
          'rgba(41, 215, 119, 1)',
          'rgba(41, 215, 119, 1)',
          'rgba(41, 215, 119, 1)',
          'rgba(41, 215, 119, 1)',
          'rgba(41, 215, 119, 1)',
          'rgba(41, 215, 119, 1)',
          // 'rgba(154, 85, 255, 1)',
          // 'rgba(154, 85, 255, 1)',
          // 'rgba(154, 85, 255, 1)',
          // 'rgba(154, 85, 255, 1)',
          // 'rgba(154, 85, 255, 1)',
        ]
      },
      {
        backgroundColor: [
          'rgba(254, 112, 150, 1)',
          'rgba(254, 112, 150, 1)',
          'rgba(254, 112, 150, 1)',
          'rgba(254, 112, 150, 1)',
          'rgba(254, 112, 150, 1)',
          'rgba(254, 112, 150, 1)',
          'rgba(254, 112, 150, 1)',
          'rgba(254, 112, 150, 1)',
          'rgba(254, 112, 150, 1)',
          'rgba(254, 112, 150, 1)',
          'rgba(254, 112, 150, 1)',
          'rgba(254, 112, 150, 1)',
        ],
        borderColor: [
          'rgba(254, 112, 150, 1)',
          'rgba(254, 112, 150, 1)',
          'rgba(254, 112, 150, 1)',
          'rgba(254, 112, 150, 1)',
          'rgba(254, 112, 150, 1)',
          'rgba(254, 112, 150, 1)',
          'rgba(254, 112, 150, 1)',
          'rgba(254, 112, 150, 1)',
          'rgba(254, 112, 150, 1)',
          'rgba(254, 112, 150, 1)',
          'rgba(254, 112, 150, 1)',
          'rgba(254, 112, 150, 1)',
        ]
      },
      {
        backgroundColor: [
          'rgba(177, 148, 250, 1)',
          'rgba(177, 148, 250, 1)',
          'rgba(177, 148, 250, 1)',
          'rgba(177, 148, 250, 1)',
          'rgba(177, 148, 250, 1)',
          'rgba(177, 148, 250, 1)',
          'rgba(177, 148, 250, 1)',
          'rgba(177, 148, 250, 1)',
          'rgba(177, 148, 250, 1)',
          'rgba(177, 148, 250, 1)',
          'rgba(177, 148, 250, 1)',
          'rgba(177, 148, 250, 1)',
        ],
        borderColor: [
          'rgba(177, 148, 250, 1)',
          'rgba(177, 148, 250, 1)',
          'rgba(177, 148, 250, 1)',
          'rgba(177, 148, 250, 1)',
          'rgba(177, 148, 250, 1)',
          'rgba(177, 148, 250, 1)',
          'rgba(177, 148, 250, 1)',
          'rgba(177, 148, 250, 1)',
          'rgba(177, 148, 250, 1)',
          'rgba(177, 148, 250, 1)',
          'rgba(177, 148, 250, 1)',
          'rgba(177, 148, 250, 1)',
        ]
      },
    ];
  }

  public iproBannerToggled = false;
  toggleProBanner() {
    this.iproBannerToggled = !this.iproBannerToggled;
    if (this.iproBannerToggled) {
      document.querySelector(".proBanner").classList.add("d-none");
    } else {
      document.querySelector(".proBanner").classList.remove("d-none");
    }
  }
  date: Date = new Date();


  trafficChartData = [
    {
      data: [25, 2, 4],
    }
  ];

  trafficChartLabels = ["Presentdays", "Absent", "Leaves"];

  trafficChartOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    },
    legend: false,
  };

  trafficChartColors = [
    {
      backgroundColor: [
        'rgba(132, 217, 210, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(177, 148, 250, 1)',
      ],
      borderColor: [
        'rgba(132, 217, 210, .2)',
        'rgba(254, 112, 150, .2)',
        'rgba(177, 148, 250, .2)',
      ]
    }
  ];

}
