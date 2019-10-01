import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';
import { GcService } from '../../services/user/gc.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-profile-gc',
  templateUrl: './profile-gc.page.html',
  styleUrls: ['./profile-gc.page.scss'],
})
export class ProfileGcPage implements OnInit {

  public userProfile: any;

  constructor(
    private alertCtrl: AlertController,
    private authService: AuthService,
    private gcService: GcService,
    private router: Router
  ) {}

  ngOnInit() {

     this.gcService
    .getUserProfileGc()
    .get()
    .then( userProfileGcSnapshot => {
      this.userProfile = userProfileGcSnapshot.data();
    });

    this.gcService.read_gc().subscribe(data => {
 
      this.userProfile = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          firstName: e.payload.doc.data()['firstName'],
          lastName: e.payload.doc.data()['lastName'],
          email: e.payload.doc.data()['email'],
        };
      })
      console.log(this.userProfile);
 
    });
  }

  logOut(): void {
    this.authService.logoutUser().then( () => {
      this.router.navigateByUrl('login');
    });
  }


  async updateName(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: 'Your first name & last name',
      inputs: [
        {
          type: 'text',
          name: 'firstName',
          placeholder: 'Your first name',
          value: this.userProfile.firstName,
        },
        {
          type: 'text',
          name: 'lastName',
          placeholder: 'Your last name',
          value: this.userProfile.lastName,
        },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.gcService.updateName(data.firstName, data.lastName);
          },
        },
      ],
    });
    await alert.present();
  }

  // updateDOB(birthDate: string): void {
  //   if (birthDate === undefined) {
  //     return;
  //   }
  //   this.gcService.updateDOB(birthDate);
  // }

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
            this.gcService
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
        { name: 'newPassword', placeholder: 'New password', type: 'password' },
        { name: 'oldPassword', placeholder: 'Old password', type: 'password' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.gcService.updatePassword(
              data.newPassword,
              data.oldPassword
            );
          },
        },
      ],
    });
    await alert.present();
  }

}
