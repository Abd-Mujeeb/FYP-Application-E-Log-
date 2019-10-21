import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GcService } from 'src/app/services/user/gc.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-changepw-gc',
  templateUrl: './changepw-gc.page.html',
  styleUrls: ['./changepw-gc.page.scss'],
})
export class ChangepwGcPage implements OnInit {

  public  changepwForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private gcService: GcService,
    private alertCtrl: AlertController,
    public toastController: ToastController) { }

  ngOnInit() {
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


  }

  async updatePassword(): Promise<void> {
    const oldPassword = this.changepwForm.value.password;
    const newPassword = this.changepwForm.value.newpassword;
    const confirmpw = this.changepwForm.value.confirmpw;

    if(newPassword == confirmpw){
      this.gcService.updatePassword(oldPassword, newPassword)
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

