import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'

import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { AdminService } from '../admin.service';
import { pbsupervisorService } from '../pbsupervisor.service';
import { companysupervisorService } from '../companysupervisor.service';
import { gcService } from '../gc.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

	//onclick button for register
	public buttonClicked: boolean = false; //Whatever you want to initialise it as
	
		public onButtonClick() {
	
			this.buttonClicked = !this.buttonClicked;
		}
	
		public buttonClicked_admin: boolean = false; //Whatever you want to initialise it as
	
		public onButtonClick_admin() {
	
			this.buttonClicked_admin = !this.buttonClicked_admin;
		}

		public buttonClicked_pbsupervisor: boolean = false; //Whatever you want to initialise it as
	
		public onButtonClick_pbsupervisor() {
	
			this.buttonClicked_pbsupervisor = !this.buttonClicked_pbsupervisor;
		}

		public buttonClicked_companysupervisor: boolean = false; //Whatever you want to initialise it as
	
		public onButtonClick_companysupervisor() {
	
			this.buttonClicked_companysupervisor = !this.buttonClicked_companysupervisor;
		}

		public buttonClicked_gc: boolean = false; //Whatever you want to initialise it as
	
		public onButtonClick_gc() {
	
			this.buttonClicked_gc = !this.buttonClicked_gc;
		}
		
	name: string = ""
	company: string = ""
	groupcode: string = ""
	intakeno: number 
	schooldept: string = ""
	email: string = ""
	password: string = ""
	cpassword: string = ""

	constructor(
		public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		public user: UserService,
		public admin: AdminService,
		public pbsupervisor: pbsupervisorService,
		public companysupervisor: companysupervisorService,
		public gc: gcService,
		public alertController: AlertController,
		public router: Router
		) { }

	ngOnInit() {
	}

	//student
	async register() {
		const { name, groupcode, intakeno, schooldept, email, password, cpassword } = this
		if(password !== cpassword) {
			this.showAlert("Error!", "Password don't match")
			return console.error("Passwords don't match")
		}

		try {
			const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
			console.log(res)
			this.showAlert('Success', 'You are registered!')
			this.afstore.doc(`users/${res.user.uid}`).set({
				name,
				groupcode,
				intakeno,
				schooldept,
				email,
				isStdudent: true
			})

			this.user.setUser({
				name,
				email,
				uid: res.user.uid
			})

			
			this.router.navigate(['/home'])

		} catch(error) {
			console.dir(error)
			this.showAlert("Error", error.message)
		}
	}

	//admin
	async regforadmin() {
		const { name, email, password, cpassword } = this
		if(password !== cpassword) {
			this.showAlert("Error!", "Password don't match")
			return console.error("Passwords don't match")
		}

		try {
			const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
			console.log(res)
			this.showAlert('Success', 'You are registered!')
			this.afstore.doc(`users_admin/${res.user.uid}`).set({
				name,
				email,
				isAdmin: true
			})

			this.admin.setUser({
				name,
				email,
				uid: res.user.uid
			})

			
			this.router.navigate(['/notification'])

		} catch(error) {
			console.dir(error)
			this.showAlert("Error", error.message)
		}
	}
	

	//pb supervisor
	async regforpbsupervisor() {
		const { name, groupcode, schooldept, email, password, cpassword } = this
		if(password !== cpassword) {
			this.showAlert("Error!", "Password don't match")
			return console.error("Passwords don't match")
		}

		try {
			const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
			console.log(res)
			this.showAlert('Success', 'You are registered!')
			this.afstore.doc(`users_pbsupervisor/${res.user.uid}`).set({
				name,
				email,
				ispbsupervisor: true
			})

			this.pbsupervisor.setUser({
				name,
				email,
				uid: res.user.uid
			})

			
			this.router.navigate(['/home'])

		} catch(error) {
			console.dir(error)
			this.showAlert("Error", error.message)
		}
	}

	//industrial supervisor
	async regforcompanysupervisor() {
		const { name, company, email, password, cpassword } = this
		if(password !== cpassword) {
			this.showAlert("Error!", "Password don't match")
			return console.error("Passwords don't match")
		}

		try {
			const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
			console.log(res)
			this.showAlert('Success', 'You are registered!')
			this.afstore.doc(`users_companysupervisor/${res.user.uid}`).set({
				name,
				company,
				email,
				iscompanysupervisor: true
			})

			this.companysupervisor.setUser({
				name,
				email,
				uid: res.user.uid
			})

			
			this.router.navigate(['/home'])

		} catch(error) {
			console.dir(error)
			this.showAlert("Error", error.message)
		}
	}

	async regforgc() {
		const { name, groupcode, schooldept, email, password, cpassword } = this
		if(password !== cpassword) {
			this.showAlert("Error!", "Password don't match")
			return console.error("Passwords don't match")
		}

		try {
			const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
			console.log(res)
			this.showAlert('Success', 'You are registered!')
			this.afstore.doc(`users_gc/${res.user.uid}`).set({
				name,
				email,
				groupcode,
				schooldept,
				isgc: true
			})

			this.gc.setUser({
				name,
				email,
				uid: res.user.uid
			})

			
			this.router.navigate(['/home'])

		} catch(error) {
			console.dir(error)
			this.showAlert("Error", error.message)
		}
	}
	
	//pop up error alert
	async showAlert(header: string, message: string) {
		const alertController = await this.alertController.create({
			header,
			message,
			buttons: ["Ok"]
		})

		await alertController.present()
	}



		
	

	// async presentAlert(title: string, content: string) {
	// 	const alert = await this.alertController.create({
	// 		header: title,
	// 		message: content,
	// 		buttons: ['OK']
	// 	})

	// 	await alert.present()
	// }


}