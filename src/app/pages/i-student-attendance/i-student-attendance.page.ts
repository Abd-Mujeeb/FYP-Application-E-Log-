import { Component, OnInit } from '@angular/core';
import { IsupervisorService } from 'src/app/services/user/isupervisor.service';

@Component({
  selector: 'app-i-student-attendance',
  templateUrl: './i-student-attendance.page.html',
  styleUrls: ['./i-student-attendance.page.scss'],
})
export class IStudentAttendancePage implements OnInit {

  public attendancelist: any[];
  public loadeditems: any[];

  constructor(  
    private isupervisorService: IsupervisorService ,
    ) { }

  ngOnInit() {
    this.isupervisorService.read_isupervisor_attendance().subscribe(data => {

      this.attendancelist = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          email: e.payload.doc.data()['email'],
          address: e.payload.doc.data()['address'],
          timeinstamp: e.payload.doc.data()['timeinstamp'],
          timeoutstamp: e.payload.doc.data()['timeoutstamp'],
          geoLatitude: e.payload.doc.data()['geoLatitude'],
          geoLongitude: e.payload.doc.data()['geoLongitude'],
          timeoutLatitude: e.payload.doc.data()['timeoutLatitude'],
          timeoutLongitude: e.payload.doc.data()['timeoutLongitude'],
         
        };
      })
      console.log(this.attendancelist);
      this.loadeditems = this.attendancelist;
      
    });
   
  }

  
  initializeItems(): void {
    this.attendancelist = this.loadeditems;
  }
  
  filterList(evt){
    this.initializeItems();
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm){
      return;
    }
  
    this.attendancelist = this.attendancelist.filter(currentitems => {
      if (currentitems.name, currentitems.email  && searchTerm) {
        if (currentitems.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        currentitems.email.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ){
          return true;
        }
        return false;
      }
    });
  }
  
  }
  
