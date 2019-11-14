import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, AlertController, ToastController } from '@ionic/angular';
import { PbsupervisorService } from 'src/app/services/user/pbsupervisor.service';

@Component({
  selector: 'app-editpbsupervisor-modal',
  templateUrl: './editpbsupervisor-modal.page.html',
  styleUrls: ['./editpbsupervisor-modal.page.scss'],
})
export class EditpbsupervisorModalPage implements OnInit {

  record: any;
  public pbsupervisorlist: any[];
  public loadedpbsupervisorlist: any[];
  private oldPasswordDatabase: any;
  private oldEmailDatabase: any;
  public userInformation: any;


  constructor(
    private navParams: NavParams,
    private pbsupervisorService: PbsupervisorService,
    private alertCtrl: AlertController,
    private modalController: ModalController,
    public toastCtrl: ToastController,) { 
      
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

    // this.name = this.navParams.get('name');
    // this.email = this.navParams.get('email');
    // this.school_dept = this.navParams.get('school_dept');
    // this.contact_no = this.navParams.get('contact_no');
    
    this.record = this.navParams.get('record');
    console.log(this.record, 'ani step 2');
    // this.sub = this.route.params.subscribe(params => {
    //   this.record = params['id'];
    //   console.log(this.record , 'ani step 2');
    // })

    let pbsupervisorUID = this.record;
    console.log(pbsupervisorUID, 'ani step 3');
    this.pbsupervisorService.read_specific_pbsupervisor(pbsupervisorUID).subscribe(data => {

      this.pbsupervisorlist = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['displayName'],
          email: e.payload.doc.data()['email'],
          contact_no: e.payload.doc.data()['contact_no'],
          school_dept: e.payload.doc.data()['school_dept'],
        };
      })
      console.log(this.pbsupervisorlist);
      this.loadedpbsupervisorlist = this.pbsupervisorlist;

    });

  }




  async presentAlertConfirm(item){
    const alert = await this.alertCtrl.create({
      subHeader: "Are you sure to remove this account?",
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
          text: 'Remove',
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
               this.pbsupervisorService.delete_specific_pbsupervisor( data.email, data.password , item );
               this.modalController.dismiss();
             
             
            }
          }
        }
      ]
    })
    await alert.present()
   
    
  }

  
 


  close(){
    this.modalController.dismiss();
  }

}
