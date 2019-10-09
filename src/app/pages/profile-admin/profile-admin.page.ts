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

    // this.adminService.getUserProfileAdmin().subscribe(data => {
 
    //   this.userProfile = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       isEdit: false,
    //       name: e.payload.doc.data()['name'],
    //       email: e.payload.doc.data()['email'],
    //     };
    //   })
    //   console.log(this.userProfile);
 
    // });
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
          name: 'name',
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
        { name: 'currentPassword', placeholder: 'Current Password', type: 'password' },
        { name: 'newPassword', placeholder: 'New password', type: 'password' },
        { name: 'confirmPassword', placeholder: 'Confirm Password', type: 'password' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.adminService.updatePassword(
              data.newPassword,
              data.currentPassword
            );
          },
        },
      ],
    });
    await alert.present();
  }





}