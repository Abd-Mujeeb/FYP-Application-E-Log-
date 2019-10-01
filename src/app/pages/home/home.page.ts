import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public admin = false;
  public pbsupervisor = false;
  public gc = false;
  public student = false;

  constructor() { }

  ngOnInit() {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .doc(`/userProfile/${user.uid}`)
          .get()
          .then(userProfileSnapshot => {
            this.admin = userProfileSnapshot.data().admin;
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
            this.admin = users_adminSnapshot.data().admin;
          });
      }
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .doc(`users_student/${user.uid}`)
          .get()
          .then(users_studentSnapshot => {
            this.student = users_studentSnapshot.data().student;
          });
      }
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .doc(`users_pbsupervisor/${user.uid}`)
          .get()
          .then(users_pbsupervisorSnapshot => {
            this.pbsupervisor = users_pbsupervisorSnapshot.data().pbsupervisor;
          });
      }
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .doc(`users_gc/${user.uid}`)
          .get()
          .then(users_gcSnapshot => {
            this.gc = users_gcSnapshot.data().gc;
          });
      }
    });

}
}
