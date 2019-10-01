import { Component, OnInit } from '@angular/core';
// import { Plugins } from '@capacitor/core';

// const { SplashScreen, StatusBar } = Plugins;

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {




  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,

  ) {
    this.initializeApp();
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
  
  }
}
