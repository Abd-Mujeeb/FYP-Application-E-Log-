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

      this.editprofile_form = this.formBuilder.group({
        displayName: [
          '',
          Validators.compose([Validators.required, Validators.minLength(5)]),
        ],
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        contact_no: [
          '',
          Validators.compose([Validators.required, Validators.pattern("[78][0-9]{6}")]),
        ],
      });

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
      displayName: new FormControl(this.item.displayName, Validators.required),
      email: new FormControl(this.item.email, Validators.email),
      contact_no: new FormControl(this.item.contact_no, Validators.required),
      
    });


    this.adminService
    .getUserProfileAdmin()
    .get()
    .then(userInformationSnapshot => {
      this.userInformation = userInformationSnapshot.data();
      
    })

  }


  async onSubmit(value){
    const toast = await this.toastCtrl.create({
      message: 'Update successfully',
      duration: 3000
    });

    this.adminService.updateProfile(this.item.id, value)
    .then(
      res => {
        this.modalController.dismiss();
        this.router.navigate(["/info-admin"]);
        toast.present();
      }
    )
  }

async presentAlertConfirm(item){
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
