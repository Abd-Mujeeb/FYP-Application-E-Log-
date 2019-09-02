import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth' 
import { auth } from 'firebase/app'

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform, NavController } from '@ionic/angular';

import { UserService } from '../user.service';
import { AdminService } from '../admin.service';
import { pbsupervisorService } from '../pbsupervisor.service';
import { companysupervisorService } from '../companysupervisor.service';
import { gcService } from '../gc.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  splash = true;

  email: string = ""
  password: string = ""

   constructor(
    public afAuth: AngularFireAuth, 
    public platform: Platform,
    public statusBar: StatusBar,
	public user: UserService, 
	public admin: AdminService, 
	public pbsupervisor: pbsupervisorService,
	public companysupervisor: companysupervisorService,
	public gc: gcService,
    public router: Router,
    public splashScreen: SplashScreen,
    public navCtrl: NavController
    ) { 
      
  }


  ngOnInit() {

  }
  

  async login() {
		const { email, password } = this
		try {
			// kind of a hack. 
			const res = await this.afAuth.auth.signInWithEmailAndPassword(email , password)
			
			if(res.user) {
				this.user.setUser({
					name,
					email,
					uid: res.user.uid
				})
				this.router.navigate(['/home'])

				this.admin.setUser({
					name,
					email,
					uid: res.user.uid
				})
				this.router.navigate(['/home'])

				this.pbsupervisor.setUser({
					name,
					email,
					uid: res.user.uid
				})
				this.router.navigate(['/home'])

				this.companysupervisor.setUser({
					name,
					email,
					uid: res.user.uid
				})
				this.router.navigate(['/home'])

				this.gc.setUser({
					name,
					email,
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

