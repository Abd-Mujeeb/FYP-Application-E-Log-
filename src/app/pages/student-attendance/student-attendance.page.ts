import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/user/student.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/user/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.page.html',
  styleUrls: ['./student-attendance.page.scss'],
})
export class StudentAttendancePage implements OnInit {
  public attendancelist: any[];
  public loadeditems: any[];

  record: any;
  private sub: any;
  displayName: string;
  
  constructor(  
    private studentService: StudentService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private navCtrl: NavController,
    ) { }

  ngOnInit() {

    if(this.authService.userDetails()){
      this.displayName = this.authService.userDetails().displayName;
    } else {
      this.navCtrl.navigateBack('');
    }

    this.sub = this.route.params.subscribe(params => {
      this.record = params['id'];
      console.log(this.record , 'ani step 2');
    })
    let studentUID = this.record;
    console.log(studentUID , 'ani step 3');
    this.studentService.read_student_attendance(studentUID).subscribe(data => {

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
          timeoutaddress: e.payload.doc.data()['timeoutaddress'],
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
  