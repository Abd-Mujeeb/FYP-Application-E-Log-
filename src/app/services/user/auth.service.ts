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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user: Observable<any>;
  currentUser = new BehaviorSubject(null);
 

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.doc(`users/${user.uid}`).valueChanges().pipe(
            take(1),
            tap(data => {
              data['id'] = user.uid;
              this.currentUser.next(data);
            })
          );
        } else {
          this.currentUser.next(null);
          return of(null);
        }
      })
    );
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



  
    resetPassword(email:string): Promise<void> {
      return firebase.auth().sendPasswordResetEmail(email);
    }
  

  logoutUser():Promise<void> {
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


  
}
