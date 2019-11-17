import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { PbsupervisorService } from 'src/app/services/user/pbsupervisor.service';

@Component({
  selector: 'app-pb-studentlist-modal',
  templateUrl: './pb-studentlist-modal.page.html',
  styleUrls: ['./pb-studentlist-modal.page.scss'],
})
export class PbStudentlistModalPage implements OnInit {
  public userInformation: any;
  private oldPasswordDatabase: any;
  private oldEmailDatabase: any;
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


  ) {


    this.pbsupervisorService
    .getUserProfilePbsupervisor()
    .get()
    .then(userInformationSnapshot => {
      this.oldPasswordDatabase = userInformationSnapshot.data().password;
      
    })

    this.pbsupervisorService
    .getUserProfilePbsupervisor()
    .get()
    .then(userInformationSnapshot => {
      this.oldEmailDatabase = userInformationSnapshot.data().email;
      
    })    

  

    


   }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }


  ngOnInit() {

    this.pbsupervisorService
      .getUserProfilePbsupervisor()
      .get()
      .then(userInformationSnapshot => {
        this.userInformation = userInformationSnapshot.data();
        
      })

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
          percentage: e.payload.doc.data()['attendance'],
          status: e.payload.doc.data()['status']
        };
      })
      console.log(this.studentlist);
      this.loadedstudentlist = this.studentlist;

    });

  }


  initializeItems(): void {
    this.studentlist = this.loadedstudentlist;
  }

  // read_studenttask(record){
  //   let recordId = record ? record.id : null;
  //   this.router.navigate(['/student-task', { id: recordId}]);
  //   console.log(recordId, 'ani step 1 (forward data ID)');
  //   this.modalController.dismiss();
  // }

  read_studenttask(record){
    let recordId = record ? record.id : null;
    this.router.navigate(['/select-date', { id: recordId}]);
    console.log(recordId, 'ani step 1 (forward data ID)');
    this.modalController.dismiss();
  }

  read_studentattendance(record){
    let recordId = record ? record.id : null;
    this.router.navigate(['/student-attendance-pbsupervisor', { id: recordId}]);
    console.log(recordId, 'ani step 1 (forward data ID)');
    this.modalController.dismiss();

  }

  async presentAlertConfirm(item){
    const alert = await this.alertCtrl.create({
      subHeader: "Are you sure to deselect this student?",
      buttons:
      [
        {
          text: 'No'
        },
        {
          text: 'Yes',
          handler: data => {
               this.pbsupervisorService.deselect_student( item );
               this.modalController.dismiss();
             
             
            }
          }
        
      ]
    })
    await alert.present()
   
    
  }
  close() {
    this.modalController.dismiss();
  }
}

