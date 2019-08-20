import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform, NavController } from '@ionic/angular';

import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  splash = true;

  username: string = ""
	password: string = ""

   constructor(
    public afAuth: AngularFireAuth, 
    public platform: Platform,
    public statusBar: StatusBar,
    public user: UserService, 
    public router: Router,
    public splashScreen: SplashScreen,
    public navCtrl: NavController
    ) { this.initializeApp();
      
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });

  
  

  }

  ngOnInit() {

  }
  

  async login() {
		const { username, password } = this
		try {
			// kind of a hack. 
			const res = await this.afAuth.auth.signInWithEmailAndPassword(username , password)
			
			if(res.user) {
				this.user.setUser({
					username,
					uid: res.user.uid
				})
				this.router.navigate(['/home'])
			}
		
		} catch(err) {
			console.dir(err)
			if(err.code === "auth/user-not-found") {
				console.log("User not found")
			}
		}
	}

}

