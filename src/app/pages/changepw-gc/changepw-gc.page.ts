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
  public pw: any;
  password_Type: string = 'password';
  password_Shown: boolean = false;

  error_messages = {
    'password': [
      { type: 'required', message: 'This is required' },
      { type: 'maxlength', message: 'Password length not more than 30 characters' },
    ],
    'newpassword': [
      { type: 'required', message: 'Minimum of 8 characters or more.' },
      { type: 'pattern', message: 'Must contain at least one upercase, lowercase, number and speacial characters(!@#$%^&)' },
      { type: 'maxlength', message: 'Password length not more than 30 characters' },
    ],
    'confirmpw': [
      { type: 'required', message: 'Minimum of 8 characters or more.' },
      { type: 'pattern', message: 'Must contain at least one upercase, lowercase, number and speacial characters(!@#$%^&)' },
      { type: 'maxlength', message: 'Password length not more than 30 characters' },
    ],
  }

  constructor(private formBuilder: FormBuilder,
    private gcService: GcService,
    private alertCtrl: AlertController,
    public toastController: ToastController) { }

  ngOnInit() {
    this.changepwForm = this.formBuilder.group({
      password: [
        '',
        Validators.compose([
          Validators.required, 
          Validators.minLength(8)]),
      ],
      newpassword: [
        '',
        Validators.compose([ 
          Validators.required, 
          Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}"),
          Validators.maxLength(30)]),
      ],
      confirmpw: [
        '',
        Validators.compose([ 
          Validators.required, 
          Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}"),
          Validators.maxLength(30)]),
      ],
    },
    { 
      validators: this.password.bind(this)
    });



  }

  public toggle_Password(){
    if(this.password_Shown){
      this.password_Shown = false;
      this.password_Type = 'password';
    }else{
      this.password_Shown = true;
      this.password_Type = 'text';
    }
  }
  
  password(formGroup: FormGroup) {
    const { value: newpassword } = formGroup.get('newpassword');
    const { value: confirmpw } = formGroup.get('confirmpw');
    return newpassword === confirmpw ? null : { passwordNotMatch: true };
  }

  async updatePassword(): Promise<void> {
    const oldPassword = this.changepwForm.value.password;
    const confirmpw = this.changepwForm.value.confirmpw;

  await this.gcService.updatePassword(oldPassword, confirmpw)
  await this.changepwForm.reset();
  
  
  
  }

}

