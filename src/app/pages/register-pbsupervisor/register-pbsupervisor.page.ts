import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/user/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
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
  
  schoolkeys: any;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private router: Router
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
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
      contact_no: [
        '',
        Validators.compose([Validators.minLength(5), Validators.required]),
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

  ngOnInit() { }

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

