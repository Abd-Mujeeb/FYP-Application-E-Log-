import { Component, OnInit } from '@angular/core';
// import { Plugins } from '@capacitor/core';

// const { SplashScreen, StatusBar } = Plugins;

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { ThemeService } from './services/theme.service';
import { AuthenticationService } from './services/authentication.service';
import { UploadtaskService } from './services/user/uploadtask.service';


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
    private user: UploadtaskService,
    private authService: AuthenticationService,

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


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    // SplashScreen.hide().catch(error => {
    //   console.error(error);
    // });

    // StatusBar.hide().catch(error => {
    //   console.error(error);
    // });

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
}
