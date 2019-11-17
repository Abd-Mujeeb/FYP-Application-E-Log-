import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/user/auth.service';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-pbsupervisor',
  templateUrl: './register-pbsupervisor.page.html',
  styleUrls: ['./register-pbsupervisor.page.scss'],
})
export class RegisterPbsupervisorPage implements OnInit {

  public signupForm: FormGroup;
  public loading: any;
  displayName: string;
  schoolkeys: any;

  error_messages = {
    'contact_no': [
      { type: 'required', message: 'This is required' },
      { type: 'pattern', message: 'Invalid phone number' },
    ],
    'name': [
      { type: 'required', message: 'This is required' },
      { type: 'pattern', message: 'Invalid Name' },
    ],
    'email': [
      { type: 'required', message: 'This is required' },
      { type: 'pattern', message: 'Invalid Email' },
    ],
    'password': [
      { type: 'required', message: 'Minimum of 8 characters or more.' },
      { type: 'pattern', message: 'Must contain at least one upercase, lowercase, number and speacial characters(!@#$%^&)' },
      { type: 'maxlength', message: 'Password length not more than 30 characters' },
    ],
  }
  
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
        Validators.compose([Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&.]).{8,}"), Validators.required, Validators.maxLength(30)]),
      ],
      contact_no: [
        '',
        Validators.compose([Validators.pattern("[78][1-9]{6}"), Validators.required]),
      ],


      school_department: ['', Validators.required,],



    });


    
    this.schoolkeys = [
      'SICT',
      'SBS',
      'SHS',
      'SSE',
    ]

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
      const contact_no: number = signupForm.value.contact_no;
      const school_department: string = signupForm.value.school_department;
      const password: string = signupForm.value.password;




      this.authService.register_pbsupervisor(displayName, name, email, password, school_department, contact_no).then(
        () => {
          this.loading.dismiss().then(async () => {

            const alert = await this.alertCtrl.create({
              message: 'Account successfully created',
              buttons: [{ text: 'Ok', role: 'ok' }],
            });
            this.loading.present();
            this.signupForm.reset();
            await alert.present();
            this.loading.dismiss();
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

