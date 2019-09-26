import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth' 
import { auth } from 'firebase/app'

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform, NavController, LoadingController, MenuController } from '@ionic/angular';

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
	public navCtrl: NavController,
	public loadingController: LoadingController,
	public menu: MenuController
    ) { 
		
  }

  ionViewDidEnter() {
	this.menu.swipeEnable(false);
	this.menu.enable(false);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
	this.menu.swipeEnable(true);
	this.menu.enable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
   }
  ngOnInit() {

  }
  

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      message: 'Signing In...Please wait',
      spinner: "bubbles",
      duration: 2000,
      
  
      // cssClass: 'custom-class custom-loading'
    });
      await loading.present();
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

