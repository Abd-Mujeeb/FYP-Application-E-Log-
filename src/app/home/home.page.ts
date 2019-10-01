import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  public isAdmin = false;
  public isStudent = false;
  public isgc = false;


  constructor(private admin: AdminService ) {}

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

   
   
  }

}

