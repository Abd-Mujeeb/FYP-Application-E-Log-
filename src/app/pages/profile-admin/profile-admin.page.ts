import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/user/admin.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.page.html',
  styleUrls: ['./profile-admin.page.scss'],
})
export class ProfileAdminPage implements OnInit {

  public userProfile: any;

  constructor(
    private alertCtrl: AlertController,
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit() {

     this.adminService
    .getUserProfileAdmin()
    .get()
    .then( userProfileAdminSnapshot => {
      this.userProfile = userProfileAdminSnapshot.data();
    });

    this.adminService.read_Admin().subscribe(data => {
 
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
            this.adminService.updateName(data.firstName, data.lastName);
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
  //   this.adminService.updateDOB(birthDate);
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
        { name: 'newPassword', placeholder: 'New password', type: 'password' },
        { name: 'oldPassword', placeholder: 'Old password', type: 'password' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.adminService.updatePassword(
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