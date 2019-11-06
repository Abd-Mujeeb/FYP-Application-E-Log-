import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/user/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-gc',
  templateUrl: './register-gc.page.html',
  styleUrls: ['./register-gc.page.scss'],
})
export class RegisterGcPage implements OnInit {

  public signupForm: FormGroup;
  public loading: any;
  
  schoolkeys: any;
  sictkeys: any;
  sbskeys: any;
  shskeys: any;
  ssekeys: any;

  zone1: any;
  zone2: any;
  zone3: any;
  zone4: any;

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
  
    
      school_department: ['',Validators.required,],
      group_code: ['', Validators.required]
     


    });



    this.schoolkeys = [
      'SICT',
      'SBS',
      'SHS',
      'SSE',
    ]

    this.zone1 = {
      kind: 'NWS06'
    }

    this.sictkeys = [
      'NWS06',
      'NWS07',
      'WBD',
      'INS',
      'DME',    
    ]

    this.zone2 = {
      kind: 'MKT01'
    }
    this.sbskeys = [
      'MKT01',
      'ACC02',
    ]

    this.zone3 = {
      kind: 'Nursing'
    }

    this.shskeys = [
      'Nursing',
      'Paramedic',
    ]

    this.zone4 = {
      kind: 'Civil'
    }
    this.ssekeys = [
      'Petroleum',
      'Civil',
    ]

  }

  ngOnInit() {}

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
      const group_code: string = signupForm.value.group_code;

   
      
  
      this.authService.register_gc( displayName, name, email, password, school_department, contact_no, group_code ).then(
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

