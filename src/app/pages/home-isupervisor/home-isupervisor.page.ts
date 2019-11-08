import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import { IsupervisorService } from 'src/app/services/user/isupervisor.service';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-home-isupervisor',
  templateUrl: './home-isupervisor.page.html',
  styleUrls: ['./home-isupervisor.page.scss'],
})
export class HomeIsupervisorPage implements OnInit {

  public change = false;
  public  changepwForm: FormGroup;
  name: string;

  constructor(
    private formBuilder: FormBuilder,
    private isupervisorService: IsupervisorService,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private navCtrl: NavController,
) { }

  ngOnInit() {

    if(this.authService.userDetails()){
      this.name = this.authService.userDetails().displayName;
    } else {
      this.navCtrl.navigateBack('');
    }

    
    this.changepwForm = this.formBuilder.group({
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      newpassword: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      confirmpw: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });


    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .doc(`/users/${user.uid}`)
          .get()
          .then(userProfileSnapshot => {
            this.change = userProfileSnapshot.data().change;

          });
      }
    });
  }

 
 async updatePassword(): Promise<void> {
    const oldPassword = this.changepwForm.value.password;
    const newPassword = this.changepwForm.value.newpassword;
    const confirmpw = this.changepwForm.value.confirmpw;

    if(newPassword == confirmpw){
      this.isupervisorService.updatePassword(oldPassword, newPassword)
      return this.ngOnInit();
    }else{
      return this.alert();
    }
  
    
  }


  async alert() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'New password and confirm password does not match',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('go back to change password');

          }
        },
      ]
    });

    await alert.present();
  }
}