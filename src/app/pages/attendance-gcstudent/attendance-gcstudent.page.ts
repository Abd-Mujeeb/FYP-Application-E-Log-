import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/user/student.service';

@Component({
  selector: 'app-attendance-gcstudent',
  templateUrl: './attendance-gcstudent.page.html',
  styleUrls: ['./attendance-gcstudent.page.scss'],
})
export class AttendanceGcstudentPage implements OnInit {
  public attendancelist: any[];
  public loadeditems: any[];

  constructor(  
    private studentService: StudentService,
    ) { }

  ngOnInit() {
    this.studentService.read_gcstudent_attendance().subscribe(data => {

      this.attendancelist = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          email: e.payload.doc.data()['email'],
          address: e.payload.doc.data()['address'],
          timeinpicker: e.payload.doc.data()['timeinpicker'],
          timeoutpicker: e.payload.doc.data()['timeoutpicker'],
          timestamp: e.payload.doc.data()['timestamp'],
         
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
  