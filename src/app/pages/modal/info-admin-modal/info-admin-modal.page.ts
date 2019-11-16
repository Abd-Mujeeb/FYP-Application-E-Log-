import { Component, OnInit } from '@angular/core';
import { NavParams, ToastController, AlertController, ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/services/user/admin.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-info-admin-modal',
  templateUrl: './info-admin-modal.page.html',
  styleUrls: ['./info-admin-modal.page.scss'],
})
export class InfoAdminModalPage implements OnInit {
  
  record: any;
  item: any;
  public adminlist: any[];
  public loadedadminlist: any[];
  private oldPasswordDatabase: any;
  private oldEmailDatabase: any;
  public userInformation: any;
  public editprofile_form: FormGroup;
  private sub: any;

  error_messages = {
    'contact_no': [
      { type: 'required', message: 'This is required' },
      { type: 'pattern', message: 'Invalid phone number' },
    ],
    'displayName': [
      { type: 'required', message: 'This is required' },
      { type: 'pattern', message: 'Invalid Name' },
    ],
    'email': [
      { type: 'required', message: 'This is required' },
      { type: 'pattern', message: 'Invalid Email' },
    ],
  }

  constructor(
    private navParams: NavParams,
    private adminService: AdminService,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,

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

    
    this.record = this.navParams.get('record');
    console.log(this.record, 'ani step 2');
    this.item = this.record;
    console.log(this.item, 'ani step 3');

    this.editprofile_form = this.formBuilder.group({
      displayName: [
        this.item.displayName,
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      email: [
        this.item.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
      contact_no: [
        this.item.contact_no,
        Validators.compose([Validators.required, Validators.pattern("[78][1-9]{6}")]),
      ],
    });


    this.adminService
    .getUserProfileAdmin()
    .get()
    .then(userInformationSnapshot => {
      this.userInformation = userInformationSnapshot.data();
      
    })

  }


  async onSubmit(value){


    const alertupdate = this.alertCtrl.create({
      message: 'Update Successfully',
      buttons: [{ text: 'Ok', role: 'cancel' }],
    })

    this.adminService.updateProfile(this.item.id, value)
    .then(
      async res => {
        (await alertupdate).present();
        this.modalController.dismiss();
        this.router.navigate(["/info-admin"]);
      }
    )
  }

async presentAlertConfirm(item){

  const alertenterboth = this.alertCtrl.create({
    message: 'Enter both email and password to confirm the deletion',
    buttons: [{ text: 'Ok', role: 'cancel' }],
  })

  const alertemailpasswordnotsame = this.alertCtrl.create({
    message: 'Email and Password is incorrect',
    buttons: [{ text: 'Ok', role: 'cancel' }],
  })

   const alertemail = this.alertCtrl.create({
    message: 'Email is incorrect',
    buttons: [{ text: 'Ok', role: 'cancel' }],
  })

  
  const alertpassword = this.alertCtrl.create({
    message: 'Password is incorrect',
    buttons: [{ text: 'Ok', role: 'cancel' }],
  })

    const alert = await this.alertCtrl.create({
      subHeader: "Are you sure to delete this account?",
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
          handler: async data => {
            if((data.email == "" ) && (data.password == "") 
            || (data.email == "") 
            || (data.password == "")) {
              (await alertenterboth).present();
              return false;
            } 
            else if((data.email != this.oldEmailDatabase) && (data.password != this.oldPasswordDatabase)) {
              console.log(data.email, this.oldEmailDatabase, 'email and password');
              (await alertemailpasswordnotsame).present();
              return false;
            }
            else if(data.email != this.oldEmailDatabase) {
              console.log(data.email, this.oldEmailDatabase, 'email ');
              (await alertemail).present();
              return false;
            }
            else if(data.password != this.oldPasswordDatabase) {
              console.log(data.password, this.oldPasswordDatabase, 'password');
              (await alertpassword).present();
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
    await alert.present();
   
    
  }
  close() {
    this.modalController.dismiss();
  }
}
