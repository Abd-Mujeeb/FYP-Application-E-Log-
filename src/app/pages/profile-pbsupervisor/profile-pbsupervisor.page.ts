import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';
import { ProfileService } from '../../services/user/profile.service';
import { Router } from '@angular/router';
import { PbsupervisorService } from 'src/app/services/user/pbsupervisor.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-profile-pbsupervisor',
  templateUrl: './profile-pbsupervisor.page.html',
  styleUrls: ['./profile-pbsupervisor.page.scss'],
})
export class ProfilePbsupervisorPage implements OnInit {

  public userProfile: any;
  
  constructor(
    private alertCtrl: AlertController,
    private authService: AuthService,
    private pbsupervisorService: PbsupervisorService,
    private router: Router
  ) {}

  ngOnInit() {

     this.pbsupervisorService
    .getUserProfilePbsupervisor()
    .get()
    .then( userProfilePbsupervisorSnapshot => {
      this.userProfile = userProfilePbsupervisorSnapshot.data();
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

  // updateDOB(birthDate: string): void {
  //   if (birthDate === undefined) {
  //     return;
  //   }
  //   this.pbsupervisorService.updateDOB(birthDate);
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
        { name: 'newPassword', placeholder: 'New password', type: 'password' },
        { name: 'oldPassword', placeholder: 'Old password', type: 'password' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.pbsupervisorService.updatePassword(
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
