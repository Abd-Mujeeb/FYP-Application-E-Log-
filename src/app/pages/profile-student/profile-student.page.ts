import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';
import { ProfileService } from '../../services/user/profile.service';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/user/student.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.page.html',
  styleUrls: ['./profile-student.page.scss'],
})
export class ProfileStudentPage implements OnInit {
  public userProfile: any;
  
  constructor(
    private alertCtrl: AlertController,
    private authService: AuthService,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit() {

     this.studentService
    .getUserProfileStudent()
    .get()
    .then( userProfileStudentSnapshot => {
      this.userProfile = userProfileStudentSnapshot.data();
    });

    // this.studentService.read_student().subscribe(data => {
 
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
      subHeader: 'Your Name: ',
      inputs: [
        {
          type: 'text',
          name: 'displayName',
          placeholder: 'Your full name',
          value: this.userProfile.displayName,
        },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.studentService.updateName(data.displayName);
            return this.ngOnInit();
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
  //   this.studentService.updateDOB(birthDate);
  // }

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
            this.studentService.updatePassword(
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
