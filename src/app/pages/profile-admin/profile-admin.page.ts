import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/user/admin.service';
import * as firebase from 'firebase/app';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.page.html',
  styleUrls: ['./profile-admin.page.scss'],
})
export class ProfileAdminPage implements OnInit {

  public userProfile: any;
  no: number;
  contact: boolean = false;
  public signupForm: FormGroup;
  error_messages = {
   'contact_no': [
     { type: 'required', message: 'This is required' },
     { type: 'pattern', message: 'Invalid phone number' },
   ]
 }

  constructor(
    private alertCtrl: AlertController,
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router,
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
  ) {}

  ngOnInit() {

    this.signupForm = this.formBuilder.group({
  
      contact_no: [
        '',
        Validators.compose([ 
          Validators.required,
          Validators.pattern("[78][0-9]{6}"),
      ]),

    ],

    });

     this.adminService
    .getUserProfileAdmin()
    .get()
    .then( userProfileAdminSnapshot => {
      this.userProfile = userProfileAdminSnapshot.data();
      this.no = userProfileAdminSnapshot.data()['contact_no'];
    });

  }

  contacts(){
    this.contact = true;
   }
 
   contactss(){
     this.contact = false;
    }
 
   async update(): Promise<void> {
      const telno = this.signupForm.value.contact_no;
 
     await this.adminService.updatecontact(telno);
     return   this.loadingController.create({
             message: 'Please wait..',
             duration: 2000,
             spinner: 'bubbles'
           }).then((res) => {
             res.present();
         
             res.onDidDismiss().then(async(dis) => {
               console.log('Loading dismissed! after 2 Seconds');
               const alert = await this.alertCtrl.create({
                 header: 'Notification',
                 message: 'Your contact number has successfully saved',
                 buttons: [
                   {
                     text: 'Okay',
                     cssClass: 'secondary',
                     handler: () => {
                       this.contact = false;
                       return this.ngOnInit();
                     }
                   },
                 ]
               });
           
               await alert.present();
              
               
             });
    });
   }

  logOut(): void {
    this.authService.logoutUser().then( () => {
      this.router.navigateByUrl('login');
    });
  }


  async updateName(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: 'Your name',
      inputs: [
        {
          type: 'text',
          name: 'displayName',
          placeholder: 'Your name',
          value: this.userProfile.name,
        }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.adminService.updateName(data.name);
            return this.ngOnInit();
          }
        },
      ],
    });
    await alert.present();
  }


  async updateEmail(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        { type: 'text', name: 'newEmail', placeholder: 'Your new email' },
        { name: 'password', placeholder: 'Your password', type: 'password' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.adminService
              .updateEmail(data.newEmail, data.password)
              .then(() => {
                console.log('Email Changed Successfully');
              })
              .catch(error => {
                console.log('ERROR: ' + error.message);
              });
          },
        },
      ],
    });
    await alert.present();
  }
  
  async updatePassword(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        { name: 'oldPassword', placeholder: 'Old password', type: 'password' },
        { name: 'newPassword', placeholder: 'New password', type: 'password' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.adminService.updatePassword(
              data.oldPassword,
              data.newPassword
            );
          },
        },
      ],
    });
    await alert.present();
  }





}