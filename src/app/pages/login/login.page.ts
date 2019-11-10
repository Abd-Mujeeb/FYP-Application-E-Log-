import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingController, AlertController, MenuController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';
import { Router } from '@angular/router';
import { FirstLoginPasswordPage } from '../../first-login-password/first-login-password.page';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

import { StudentService } from 'src/app/services/user/student.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  public loading: HTMLIonLoadingElement;
  alertController: any;
  public notif = false;
  userProfile: firebase.firestore.DocumentData;

  
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    // public modalController: ModalController,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    public menu: MenuController,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private localNotifications: LocalNotifications,
    // private studentService: StudentService,
  ) {
  
   }



  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['',
        Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });

    
  }



  async loginUser(loginForm: FormGroup): Promise<void> {
    if (!loginForm.valid) {
      console.log('Form is not valid yet, current value:', loginForm.value);
    } else {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();

      const email = loginForm.value.email;
      const password = loginForm.value.password;
  
      this.authService.loginUser(email, password).subscribe(
      user => {
        this.loading.dismiss();
        let role = user['role'];
        if (role == 'pbsupervisor') {
          this.router.navigateByUrl('/home-pbsupervisor');
        } else if (role == 'admin') {
          this.router.navigateByUrl('/home-admin');
        } else if (role == 'gc') {
          this.router.navigateByUrl('/home-gc');
        } else if (role == 'student') {
          
          this.router.navigateByUrl('/home-student');
        } else if (role == 'isupervisor') {
          this.router.navigateByUrl('/home-isupervisor');
        } 

        
      },
        async error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }],
            });
            await alert.present();
          });
        }
      );
    }
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
    this.menu.enable(false);


}

ionViewWillLeave() {
  // Don't forget to return the swipe to normal, otherwise 
  // the rest of the pages won't be able to swipe to open menu
this.menu.swipeEnable(true);
this.menu.enable(true);

  // If you have more than one side menu, use the id like below
  // this.menu.swipeEnable(true, 'menu1');
 }
}

