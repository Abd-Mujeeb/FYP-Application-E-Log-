import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/user/student.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-info-student3',
  templateUrl: './info-student3.page.html',
  styleUrls: ['./info-student3.page.scss'],
})
export class InfoStudent3Page implements OnInit {
  public userProfile: any[];
  public loadeduserProfile: any [];


  constructor(
    private studentService: StudentService,
    private firestore: AngularFirestore,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.studentService.read_student_dme().subscribe(data => {
 
      this.userProfile = data.map(e => {
           return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['displayName'],
          email: e.payload.doc.data()['email'],
          school_dept: e.payload.doc.data()['school_dept'],
          group_code: e.payload.doc.data()['group_code'],
          student_id: e.payload.doc.data()['student_id'],
          company: e.payload.doc.data()['company']

        };
      })
      console.log(this.userProfile);
   this.loadeduserProfile = this.userProfile;
  
    });


  }

  initializeItems(): void {
    this.userProfile = this.loadeduserProfile;
  }

  filterList(evt){
    this.initializeItems();
    const searchTerm = evt.srcElement.value;

    if (!searchTerm){
      return;
    }

    this.userProfile = this.userProfile.filter(currentlist => {
      if (currentlist.name, currentlist.email && searchTerm){
        if (currentlist.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        currentlist.email.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
          return true;
        }
        return false;
      }
    });
  }

  EditRecord(record) {
    record.isEdit = true;
    record.Editname = record.name;
    record.Editemail = record.email;
    record.Editschool_dept = record.school_dept;
    record.Editgroup_code = record.group_code;
    record.Editstudent_id = record.student_id;
    record.Editcompany = record.company;
  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['displayName'] = recordRow.Editname;
    record['email'] = recordRow.Editemail;
    record['school_dept'] = recordRow.Editschool_dept;
    record['group_code'] = recordRow.Editgroup_code;
    record['student_id'] = recordRow.Editstudent_id;
    record['company'] = recordRow.Editcompany;
    this.studentService.update_student(recordRow.id, record);
    recordRow.isEdit = false;
  }

  RemoveRecord(rowID) {
    this.studentService.delete_student(rowID);
  }

  async presentAlertConfirm(rowID) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Message <strong>Are you sure to remove user? </br>click "confirm" to permanantly delete user</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            console.log('Confirm');
            this.studentService.delete_student(rowID);
          }
        }
      ]
    });

    await alert.present();
  }



}
