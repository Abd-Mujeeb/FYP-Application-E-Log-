import { Component, OnInit } from '@angular/core';

import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { ThemeService } from './services/theme.service';
import { AuthenticationService } from './services/authentication.service';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {




  userEmail: string;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private theme: ThemeService,
    private navCtrl: NavController,
    private authService: AuthenticationService,
    
    public menu: MenuController,

    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,

  ) {
    this.initializeApp();
  }

  status = false;
  

  tstChange(){
    if(this.status) {
      this.enableDark();
    } else {
      this.enableLight();
    }
   }
  
   enableDark(){
     this.theme.enableDark();
   }

   enableLight(){
     this.theme.enableLight();
   }

   ngOnInit() {
   
    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
    }else{
      this.navCtrl.navigateBack('');
    }
  }
  

  logout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }


  initializeApp() {

    this.afAuth.auth.onAuthStateChanged(user => 
      {
        if (user) {
          console.log("testing mau kh nda");
          let userId = user.uid;
          this.firestore.doc(`users/${user.uid}`).valueChanges().pipe(
            take(1)
          ).subscribe(userData => {
            const role = userData['role'];
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
        })
      } else {
        console.log('no user, maksudnya last user logout lapas ia pakai the app');
        return of(null);
      }

    });
  
    // this.platform.ready().then(() => {
    //   this.statusBar.styleDefault();
    //   this.splashScreen.hide();



    // SplashScreen.hide().catch(error => {
    //   console.error(error);
    // });

    // StatusBar.hide().catch(error => {
    //   console.error(error);
    // });

  }

}