import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';
import { ProfileService } from '../../services/user/profile.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/user/admin.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public userProfile: any;
  public admin = false;
  constructor(
    private alertCtrl: AlertController,
    private authService: AuthService,
    private profileService: ProfileService,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit() {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .doc(`/users_admin/${user.uid}`)
          .get()
          .then(userProfileSnapshot => {
            this.admin = userProfileSnapshot.data().admin;
          });
      }

     this.adminService
    .getUserProfileAdmin()
    .get()
    .then( userProfileAdminSnapshot => {
      this.userProfile = userProfileAdminSnapshot.data();
    });

    });

    this.profileService
    .getUserProfile()
    .get()
    .then( userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.data();
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

    this.profileService.read_pbsupervisor().subscribe(data => {
 
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

    this.profileService.read_gc().subscribe(data => {
 
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

    this.profileService.read_student().subscribe(data => {
 
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
            this.profileService.updateName(data.firstName, data.lastName);
          },
        },
      ],
    });
    await alert.present();
  }

  updateDOB(birthDate: string): void {
    if (birthDate === undefined) {
      return;
    }
    this.profileService.updateDOB(birthDate);
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
            this.profileService
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
            this.profileService.updatePassword(
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