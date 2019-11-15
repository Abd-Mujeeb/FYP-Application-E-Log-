import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ModalController, NavParams } from '@ionic/angular';
import { GcService } from 'src/app/services/user/gc.service';

@Component({
  selector: 'app-gc-studentlist-modal',
  templateUrl: './gc-studentlist-modal.page.html',
  styleUrls: ['./gc-studentlist-modal.page.scss'],
})
export class GcStudentlistModalPage implements OnInit {
  item: any;
  id: any;
  record: any;
  public studentlist: any[];
  public loadedstudentlist: any[];
  constructor( 
    private modalController: ModalController,
    private router: Router,
    private gcService: GcService,
    private navParams: NavParams
    ) { }
 
  ngOnInit() {
    this.record = this.navParams.get('record');
    console.log(this.record, 'ani step 2');
    // this.sub = this.route.params.subscribe(params => {
    //   this.record = params['id'];
    //   console.log(this.record , 'ani step 2');
    // })

    let studentUID = this.record;
    console.log(studentUID, 'ani step 3');
    this.gcService.read_student(studentUID).subscribe(data => {

      this.studentlist = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['displayName'],
          email: e.payload.doc.data()['email'],
          school_dept: e.payload.doc.data()['school_dept'],
          group_code: e.payload.doc.data()['group_code'],
          student_id: e.payload.doc.data()['student_id'],
          company: e.payload.doc.data()['company'],
          gc: e.payload.doc.data()['gc'],
          pbsupervisor: e.payload.doc.data()['pbsupervisor'],
          contact_no: e.payload.doc.data()['contact_no'],
        };
      })
      console.log(this.studentlist);
      this.loadedstudentlist = this.studentlist;

    });
  }

  read_studentattendance(record){
    let recordId = record ? record.id : null;
    this.router.navigate(['/student-attendance', { id: recordId}]);
    console.log(recordId, 'ani step 1 (forward data ID)');
    this.modalController.dismiss();

  }

  close() {
    this.modalController.dismiss();
  }

}
