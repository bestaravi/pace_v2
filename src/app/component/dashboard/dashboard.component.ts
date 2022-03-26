import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit,Inject,
  LOCALE_ID  } from '@angular/core';
import { UserInfo } from 'src/app/core/model';
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
  today = new Date().getHours();
  greeting;
  currentDate = new Date();
  toDate;
  fromDate;
  attendanceList = [];
  isAttendanceLoading:boolean = false;
  presentDaysCount = 0;
  absentDaysCount = 0;
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
        console.log('Response',res)
      })
      this.getHolidayList();
      this.getTeamAbsent();
      this.getPresentAbsentDays();
    }
  }

  getHolidayList =()=>{
    this._dataService.fetchHolidayList(this.person.compcode).subscribe(res =>{
      if(res[0].status == 'success'){
        this.holidayList = res[0].data
      }
      console.log(44,this.holidayList)
    })
  }

  getTeamAbsent =()=>{
    this._dataService.fetchTeamAbsentList(this.person.compcode).subscribe(res =>{
      if(res[0].status == 'success'){
        this.absentList = res[0].data
      }
      console.log('Response',res)
    })
  }

  getPresentAbsentDays = ()=>{
    this.currentDate.setDate(this.currentDate.getDate() - 45);
      var dateString = this.currentDate.toISOString().split('T')[0];
      this.toDate = formatDate(new Date(), 'dd-MMM-yyyy' ,this.locale);
      this.fromDate = formatDate(new Date(dateString), 'dd-MMM-yyyy' ,this.locale);
      console.log(75,this.toDate, this.fromDate)

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
                if(this.attendanceList[x].status == 'XX' || this.attendanceList[x].status == 'VV'|| this.attendanceList[x].status == 'RR'|| this.attendanceList[x].status == 'FF'|| this.attendanceList[x].status == 'DD'|| this.attendanceList[x].status == 'BB'|| this.attendanceList[x].status == 'MM'|| this.attendanceList[x].status == 'CC'|| this.attendanceList[x].status == 'SS'|| this.attendanceList[x].status == 'EE' || this.attendanceList[x].status == 'LL'|| this.attendanceList[x].status == 'ZZ'|| this.attendanceList[x].status == 'PP'|| this.attendanceList[x].status == 'WH' || this.attendanceList[x].status == 'PH'

                ){
                    this.presentDaysCount++
                }else{
                  this.absentDaysCount++;
                }
              }
            }
          }
        console.log(108,this.presentDaysCount,this.absentDaysCount,res)
      })
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

  visitSaleChartData = [{
    label: 'CHN',
    data: [20, 40, 15, 35, 25, 50, 30, 20],
    borderWidth: 1,
    fill: false,
  },
  {
    label: 'USA',
    data: [40, 30, 20, 10, 50, 15, 35, 40],
    borderWidth: 1,
    fill: false,
  },
  {
    label: 'UK',
    data: [70, 10, 30, 40, 25, 50, 15, 30],
    borderWidth: 1,
    fill: false,
  }];

  visitSaleChartLabels = ["2013", "2014", "2014", "2015", "2016", "2017"];

  visitSaleChartOptions = {
    responsive: true,
    legend: false,
    scales: {
        yAxes: [{
            ticks: {
                display: false,
                min: 0,
                stepSize: 20,
                max: 80
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
            categoryPercentage: 0.4,
            barPercentage: 0.4
        }]
      }
  };

  visitSaleChartColors = [
    {
      backgroundColor: [
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
      ],
      borderColor: [
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
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
      ],
      borderColor: [
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
      ],
      borderColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
      ]
    },
  ];

  trafficChartData = [
    {
      data: [30, 30, 40],
    }
  ];

  trafficChartLabels = ["Search Engines", "Direct Click", "Bookmarks Click"];

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
        'rgba(177, 148, 250, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(132, 217, 210, 1)'
      ],
      borderColor: [
        'rgba(177, 148, 250, .2)',
        'rgba(254, 112, 150, .2)',
        'rgba(132, 217, 210, .2)'
      ]
    }
  ];

}
