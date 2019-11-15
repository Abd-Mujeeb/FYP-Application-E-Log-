import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';
import { ProfileService } from '../../services/user/profile.service';
import { Router } from '@angular/router';
import { PbsupervisorService } from 'src/app/services/user/pbsupervisor.service';
import * as firebase from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-pbsupervisor',
  templateUrl: './profile-pbsupervisor.page.html',
  styleUrls: ['./profile-pbsupervisor.page.scss'],
})
export class ProfilePbsupervisorPage implements OnInit {

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
    private pbsupervisorService: PbsupervisorService,
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

     this.pbsupervisorService
    .getUserProfilePbsupervisor()
    .get()
    .then( userProfilePbsupervisorSnapshot => {
      this.userProfile = userProfilePbsupervisorSnapshot.data();
      this.no = userProfilePbsupervisorSnapshot.data()['contact_no'];
    });

    // this.pbsupervisorService.read_pbsupervisor().subscribe(data => {
 
    //   this.userProfile = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       isEdit: false,
    //       firstName: e.payload.doc.data()['firstName'],
    //       lastName: e.payload.doc.data()['lastName'],
    //       email: e.payload.doc.data()['email'],
    //     };
    //   })
    //   console.log(this.userProfile);
 
    // });
  }

  contacts(){
    this.contact = true;
   }
 
   contactss(){
     this.contact = false;
    }
 
   async update(): Promise<void> {
      const telno = this.signupForm.value.contact_no;
 
     await this.pbsupervisorService.updatecontact(telno);
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
      subHeader: 'Name:',
      inputs: [
        {
          type: 'text',
          name: 'name',
          placeholder: 'Your full name',
          value: this.userProfile.name,
        }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.pbsupervisorService.updateName(data.name);
            this.ngOnInit();
          },
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
            this.pbsupervisorService
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
            this.pbsupervisorService.updatePassword(
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
