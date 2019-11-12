import { Component, OnInit } from '@angular/core';
import { NavParams, ToastController, AlertController, ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/services/user/admin.service';

@Component({
  selector: 'app-info-admin-modal',
  templateUrl: './info-admin-modal.page.html',
  styleUrls: ['./info-admin-modal.page.scss'],
})
export class InfoAdminModalPage implements OnInit {
  
  record: any;
  public adminlist: any[];
  public loadedadminlist: any[];
  private oldPasswordDatabase: any;
  private oldEmailDatabase: any;
  public userInformation: any;

  constructor(
    private navParams: NavParams,
    private adminService: AdminService,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private modalController: ModalController,
    ) {

      this.adminService
      .getUserProfileAdmin()
      .get()
      .then(userInformationSnapshot => {
        this.oldPasswordDatabase = userInformationSnapshot.data().password;
        
      })
  
      this.adminService
      .getUserProfileAdmin()
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

    this.adminService
    .getUserProfileAdmin()
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

    let adminUID = this.record;
    console.log(adminUID, 'ani step 3');
    this.adminService.read_specific_admin(adminUID).subscribe(data => {

      this.adminlist = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['displayName'],
          email: e.payload.doc.data()['email'],
          contact_no: e.payload.doc.data()['contact_no'],
        };
      })
      console.log(this.adminlist);
      this.loadedadminlist = this.adminlist;

    });
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
               this.adminService.delete_specific_admin( data.email, data.password , item );
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
