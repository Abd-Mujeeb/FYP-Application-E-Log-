import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/user/student.service';

@Component({
  selector: 'app-info-student',
  templateUrl: './info-student.page.html',
  styleUrls: ['./info-student.page.scss'],
})
export class InfoStudentPage implements OnInit {
  userProfile: any;

  constructor(
    private studentService: StudentService,
  ) { }

  ngOnInit() {
    this.studentService.read_student().subscribe(data => {
 
      this.userProfile = data.map(e => {
           return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          email: e.payload.doc.data()['email'],
        };
      })
      console.log(this.userProfile);
  
    });
  }

}
