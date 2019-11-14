import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/user/student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-change',
  templateUrl: './change.page.html',
  styleUrls: ['./change.page.scss'],
})
export class ChangePage implements OnInit {

  public change = false;
  public changepwForm: FormGroup;
  displayName: string;
  pw: string;
  passwordType: string = 'password';
  passwordShown: boolean = false;
  password_Type: string = 'password';
  password_Shown: boolean = false;

  error_messages = {
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

  constructor(
    public studentService: StudentService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.studentService
    .getUserProfileStudent()
    .get()
    .then( userProfileStudentSnapshot => {
      this.pw = userProfileStudentSnapshot.data()['password'];
    });

    if(this.authService.userDetails()){
      this.displayName = this.authService.userDetails().displayName;
    } else {
      this.navCtrl.navigateBack('');
    }


    this.changepwForm = this.formBuilder.group({
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

    
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .doc(`/users/${user.uid}`)
          .get()
          .then(userProfileSnapshot => {
            this.pw = userProfileSnapshot.data().password;

          });
      }
      
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

  public togglePassword(){
    if(this.passwordShown){
      this.passwordShown = false;
      this.passwordType = 'password';
    }else{
      this.passwordShown = true;
      this.passwordType = 'text';
    }
  }

  password(formGroup: FormGroup) {
    const { value: newpassword } = formGroup.get('newpassword');
    const { value: confirmpw } = formGroup.get('confirmpw');
    return newpassword === confirmpw ? null : { passwordNotMatch: true };
  }

async updatePassword(): Promise<void> {
  const oldPassword = this.pw;
  const confirmpw = this.changepwForm.value.confirmpw;


    await this.studentService.update_Password(oldPassword, confirmpw);

  
}






  

}
