import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { reject } from 'q';
import { take, switchMap, tap } from 'rxjs/operators';
import { from, Observable, of, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

var config = {
  apiKey: "AIzaSyDFNM5AsLEAoYQhtnZ7XYRfMZWrvbgdZ0Q",
  authDomain: "e-log-eab02.firebaseapp.com",
  databaseURL: "https://e-log-eab02.firebaseio.com",
};
var secondaryApp = firebase.initializeApp(config, "Secondary");


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<any>;
  currentUser = new BehaviorSubject(null);
  text: any;

  constructor(private afAuth: AngularFireAuth,
    private firebaseService: FirebaseService, private firestore: AngularFirestore, private router: Router,
    public loadingController: LoadingController, 
    private storage: Storage,) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.doc(`users/${user.uid}`).valueChanges().pipe(
            take(1),
            tap(data => {
              data['id'] = user.uid;
              this.currentUser.next(data);
              this.storage.get(user.uid).then((data) =>
              {
                this.text = data;
                console.log(data);
              });
            })
          );
        } else {
          this.currentUser.next(null);
          return of(null);
        }
      })
    );
  }

  async getUser(){
    await this.storage.get("test").then((data) =>
    {
      this.text = data;
      console.log(data);
    });
  }
  

  loginUser(
    email: string,
    password: string
  ): Observable<any> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password)).pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.doc(`users/${user.user.uid}`).valueChanges().pipe(
            take(1)
          );
        } else {
          return of(null);
        }
      })
    )
  }

  

  // signupUser(firstName: string, lastName: string, email: string, password: string): Promise<any> {
  //   return firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((newUserCredential: firebase.auth.UserCredential) => {
  //       firebase
  //         .firestore()
  //         .doc(`/userProfile/${newUserCredential.user.uid}`)
  //         .set({ firstName, lastName, email, admin:true });
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       throw new Error(error);
  //     });

  //   }

  signupuser(displayName: string, name: string, email: string, password: string, option: string, school_department: string, group_code: string): Promise<any> {
    return secondaryApp.auth().createUserWithEmailAndPassword(email, password).then((newUserCredential: firebase.auth.UserCredential) => {
      firebase
        .firestore()
        .doc(`/users/${newUserCredential.user.uid}`)
        .set({ displayName, name, email, school_dept: school_department, role: option, change: true, group_code, notify: false });
      console.log("User " + newUserCredential.user.email + " created successfully!");
      secondaryApp.auth().signOut();
    }).catch(error => {
      console.error(error);
      throw new Error(error);
    });

  }

  csvstudent(number: string,
    displayName: string,
    name: string,
    email: string,
    school_dept: string,
    group_code: string,
    student_id: string,
    gc: string,
    company: string,
    password: string): Promise<any> {
    return secondaryApp.auth().createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: firebase.auth.UserCredential) => {
        firebase
          .firestore()
          .doc(`/student/${newUserCredential.user.uid}`)
          .set({ number, displayName, name, email, school_dept, group_code, student_id, gc, company, password, role: 'student', change: true, pbsupervisor: '' });
        console.log("users " + newUserCredential.user.email + " created successfully!");
        secondaryApp.auth().signOut();
      }).catch(error => {
        alert('The ' + email + ' ' + error);
        console.error(error);
        throw new Error(error);
      });
  }


  register_gc(displayName: string, name: string, email: string, password: string, school_department: string, contact_no: number, group_code: string): Promise<any> {
    return secondaryApp.auth().createUserWithEmailAndPassword(email, password).then((newUserCredential: firebase.auth.UserCredential) => {
      firebase
        .firestore()
        .doc(`/users/${newUserCredential.user.uid}`)
        .set({ displayName, name, email, password, school_dept: school_department, change: true, contact_no, group_code, role: 'gc' });
      console.log("User " + newUserCredential.user.email + " created successfully!");
      secondaryApp.auth().signOut();
    }).catch(error => {
      console.error(error);
      throw new Error(error);
    });

  }

  register_pbsupervisor(displayName: string, name: string, email: string, password: string, school_department: string, contact_no: number): Promise<any> {
    return secondaryApp.auth().createUserWithEmailAndPassword(email, password).then((newUserCredential: firebase.auth.UserCredential) => {
      firebase
        .firestore()
        .doc(`/users/${newUserCredential.user.uid}`)
        .set({ displayName, password, name, email, school_dept: school_department, change: true, contact_no, role: 'pbsupervisor' });
      let user = secondaryApp.auth().currentUser;
      user.updateProfile({
        displayName: displayName,
      })

      console.log("User " + newUserCredential.user.email + newUserCredential.user.displayName + " created successfully!");
      secondaryApp.auth().signOut();
    }).catch(error => {
      console.error(error);
      throw new Error(error);
    });

  }

  register_admin(displayName: string, name: string, email: string, password: string, contact_no: number): Promise<any> {
    return secondaryApp.auth().createUserWithEmailAndPassword(email, password).then((newUserCredential: firebase.auth.UserCredential) => {
      firebase
        .firestore()
        .doc(`/users/${newUserCredential.user.uid}`)
        .set({ displayName, password, name, email, change: true, contact_no, role: 'admin' });
      let user = secondaryApp.auth().currentUser;
      user.updateProfile({
        displayName: displayName,
      })
      console.log("User " + newUserCredential.user.email + newUserCredential.user.displayName + " created successfully!");
      secondaryApp.auth().signOut();
    }).catch(error => {
      console.error(error);
      throw new Error(error);
    });

  }




  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }


  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

  hasPermissions(permissions: string[]): boolean {
    for (const perm of permissions) {
      if (!this.currentUser.value || !this.currentUser.value.permissions.includes(perm)) {
        return false;
      }
    }
    return true;
  }

  userDetails() {
    return firebase.auth().currentUser;
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signOut()
        .then(() => {
          this.firebaseService.unsubscribeOnLogOut();
          resolve();
        }).catch((error) => {
          console.log(error);
          reject();
        });
    })
  }


}
