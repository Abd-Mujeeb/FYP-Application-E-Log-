import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/user/student.service';

@Component({
  selector: 'app-pbsupervisor-attendance',
  templateUrl: './pbsupervisor-attendance.page.html',
  styleUrls: ['./pbsupervisor-attendance.page.scss'],
})
export class PbsupervisorAttendancePage implements OnInit {
  
  public attendancelist: any[];
  public loadeditems: any[];

  constructor(  
    private studentService: StudentService,
    ) { }

  ngOnInit() {
    this.studentService.read_student_attendance().subscribe(data => {

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
  
