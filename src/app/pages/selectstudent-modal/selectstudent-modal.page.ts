import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, ModalController, ToastController } from '@ionic/angular';
import { PbsupervisorService } from 'src/app/services/user/pbsupervisor.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-selectstudent-modal',
  templateUrl: './selectstudent-modal.page.html',
  styleUrls: ['./selectstudent-modal.page.scss'],
})
export class SelectstudentModalPage implements OnInit {
  item: any;
  id: any;
  private sub: any;
  record: any;
  public studentlist: any[];
  public loadedstudentlist: any[];
  ngam: any;
  constructor(
    private navParams: NavParams,
    private route: ActivatedRoute,
    private pbsupervisorService: PbsupervisorService,
    private alertCtrl: AlertController,
    private modalController: ModalController,
    public router: Router,
    public toastCtrl: ToastController,
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
    this.pbsupervisorService.read_student(studentUID).subscribe(data => {

      this.studentlist = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['displayName'],
          email: e.payload.doc.data()['email'],
          school_dept: e.payload.doc.data()['school_dept'],
          group_code: e.payload.doc.data()['group_code'],
          student_id: e.payload.doc.data()['student_id'],
          company: e.payload.doc.data()['company'],
          pbsupervisor: e.payload.doc.data()['pbsupervisor'],
          contact_no: e.payload.doc.data()['contact_no'],
        };
      })
      console.log(this.studentlist);
      this.loadedstudentlist = this.studentlist;

    });

  }


  initializeItems(): void {
    this.studentlist = this.loadedstudentlist;
  }

  filterList(evt) {
    this.initializeItems();
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.studentlist = this.studentlist.filter(currentlist => {
      if (currentlist.name, currentlist.email, currentlist.company, currentlist.school_dept, currentlist.pbsupervisor, currentlist.gc && searchTerm) {
        if (currentlist.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
          currentlist.email.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
          currentlist.company.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
          currentlist.school_dept.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
          currentlist.pbsupervisor.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
          currentlist.gc.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  async select_this_student(record) {

    const alert = await this.alertCtrl.create({
      subHeader: "Are you sure to select this student?",
      buttons:
        [
          {
            text: 'No'
          },
          {
            text: 'Yes',
            handler: data => {
              console.log(record, 'testing 1');
              this.pbsupervisorService.selecting_student(record);
              console.log(record, 'testing 2');
              this.router.navigate(["/select-student"]);
              this.modalController.dismiss();
            }
          }

        ]
    })
    await alert.present();

  }


  close() {
    this.modalController.dismiss();
  }
}
