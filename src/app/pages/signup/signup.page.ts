import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/user/auth.service';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public signupForm: FormGroup;
  public loading: any;
  displayName: string;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private router: Router,
    private navCtrl: NavController,
  ) {
    this.signupForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([Validators.minLength(5), Validators.required]),
      ],
      email: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        '',
        Validators.compose([ Validators.required, Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}")]),
      ],
      option: ['pbsupervisor',Validators.required,],
      school_department: ['',Validators.required,],
      group_code: [''],

    });
  }

  ngOnInit() {
    if(this.authService.userDetails()){
      this.displayName = this.authService.userDetails().displayName;
    } else {
      this.navCtrl.navigateBack('');
    }
    
  }

  async signupUser(signupForm: FormGroup): Promise<void> {
    if (!signupForm.valid) {
      console.log(
        'Need to complete the form, current value: ', signupForm.value
      );
    } else {
      const displayName: string = signupForm.value.name;
      const name: string = signupForm.value.name;
      const email: string = signupForm.value.email;
      const school_department: string = signupForm.value.school_department;
      const password: string = signupForm.value.password;
      const option: string = signupForm.value.option;
      const group_code: string = signupForm.value.group_code;
   
      
  
      this.authService.signupuser( displayName, name, email, password, option, school_department, group_code, ).then(
        () => {
          this.loading.dismiss().then(async () => {

            const alert = await this.alertCtrl.create({
              message: 'Account successfully created',
              buttons: [{ text: 'Ok', role: 'ok' }],
            });
            this.signupForm.reset();
            await alert.present();
          });

        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }],
            });
            await alert.present();
          });
        }
      );
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
    }
  }

}
