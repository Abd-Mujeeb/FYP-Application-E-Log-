import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { NavController } from '@ionic/angular';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  public isAdmin = false;
  public isStudent = false;
  public isgc = false;

  userEmail: string;

  constructor( 
    private navCtrl: NavController,
    private authService: AuthenticationService,
  ) {}

  ngOnInit() {

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

