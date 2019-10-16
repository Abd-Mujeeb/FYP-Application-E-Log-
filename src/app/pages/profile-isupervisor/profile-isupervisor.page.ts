import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';
import { ProfileService } from '../../services/user/profile.service';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { IsupervisorService } from 'src/app/services/user/isupervisor.service';


@Component({
  selector: 'app-profile-isupervisor',
  templateUrl: './profile-isupervisor.page.html',
  styleUrls: ['./profile-isupervisor.page.scss'],
})
export class ProfileIsupervisorPage implements OnInit {
  public userProfile: any;
  
  constructor(
    private alertCtrl: AlertController,
    private authService: AuthService,
    private isupervisorService: IsupervisorService,
    private router: Router
  ) {}

  ngOnInit() {

     this.isupervisorService
    .getUserProfileisupervisor()
    .get()
    .then( userProfileisupervisorSnapshot => {
      this.userProfile = userProfileisupervisorSnapshot.data();
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
          name: 'displayName',
          placeholder: 'Your full name',
          value: this.userProfile.displayName,
        }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.isupervisorService.updateName(data.displayName);
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
            this.isupervisorService
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
            this.isupervisorService.updatePassword(
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
