import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/user/student.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-changepw-student',
  templateUrl: './changepw-student.page.html',
  styleUrls: ['./changepw-student.page.scss'],
})
export class ChangepwStudentPage implements OnInit {

  public  changepwForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private studentService: StudentService,
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
      this.studentService.updatePassword(oldPassword, newPassword)
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


