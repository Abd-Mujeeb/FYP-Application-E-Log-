import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { UserService } from './user.service';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public buttonClicked: boolean = false; //Whatever you want to initialise it as
	
  public onButtonClick() {

    this.buttonClicked = !this.buttonClicked;
  }

 
  public isStudent = false;
  public isAdmin = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public user: UserService, 
  	public admin: AdminService,

  ) {
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .doc(`users/${user.uid}`)
          .get()
          .then(usersSnapshot => {
            this.isStudent = usersSnapshot.data().isStudent;
          });
      }
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .doc(`users_admin/${user.uid}`)
          .get()
          .then(users_adminSnapshot => {
            this.isAdmin = users_adminSnapshot.data().isAdmin;
          });
      }
    });

   
  
  }
}
