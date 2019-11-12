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
          gc: e.payload.doc.data()['gc'],
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

  read_studenttask(record){
    let recordId = record ? record.id : null;
    this.router.navigate(['/student-task', { id: recordId}]);
    console.log(recordId, 'ani step 1 (forward data ID)');
    this.modalController.dismiss();
  }

  read_studentattendance(record){
    let recordId = record ? record.id : null;
    this.router.navigate(['/student-attendance', { id: recordId}]);
    console.log(recordId, 'ani step 1 (forward data ID)');
    this.modalController.dismiss();

  }

  async presentAlertConfirm(item){
    const alert = await this.alertCtrl.create({
      subHeader: "Are You Sure To Deselect This Student?",
      inputs: [
        {
          type: 'text',
          name: 'email',
          placeholder: 'Enter your email'
        },
        {
          type: 'password',
          name: 'password',
          placeholder: 'Enter your password'
        }
      ],
      buttons:
      [
        {
          text: 'Cancel'
        },
        {
          text: 'Delete',
          handler: data => {
            if((data.email == "" ) && (data.password == "") 
            || (data.email == "") 
            || (data.password == "")) {
              this.presentToast("Enter Both To Confirm The Deletion")
              return false;
            } 
            else if((data.email != this.oldEmailDatabase) && (data.password != this.oldPasswordDatabase)) {
              console.log(data.email, this.oldEmailDatabase, 'email and password');
              this.presentToast("Email and Password is not same")
              return false;
            }
            else if(data.email != this.oldEmailDatabase) {
              console.log(data.email, this.oldEmailDatabase, 'email ');
              this.presentToast("Email is not same")
              return false;
            }
            else if(data.password != this.oldPasswordDatabase) {
              console.log(data.password, this.oldPasswordDatabase, 'password');
              this.presentToast("Password is not same")
              return false;
            }
            else 
            {
              console.log(item, 'what is item?')
               this.pbsupervisorService.deselect_student( data.email, data.password , item );
               this.modalController.dismiss();
             
             
            }
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

