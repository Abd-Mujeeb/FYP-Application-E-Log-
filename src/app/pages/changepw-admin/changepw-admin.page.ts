import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import { AdminService } from 'src/app/services/user/admin.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-changepw-admin',
  templateUrl: './changepw-admin.page.html',
  styleUrls: ['./changepw-admin.page.scss'],
})
export class ChangepwAdminPage implements OnInit {

  public  changepwForm: FormGroup;
  public loading: HTMLIonLoadingElement;
  toast: any;
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
    private adminService: AdminService,
    private alertCtrl: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController) { }

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

  await this.adminService.updatePassword(oldPassword, confirmpw)
  await this.changepwForm.reset();
  
  
  
  }



}
