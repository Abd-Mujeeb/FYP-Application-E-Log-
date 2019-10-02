import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

interface user {
  name: string,
  email: string,
  uid: string
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
  private user: user;

  public users_student: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;

  constructor(private firestore: AngularFirestore,
    private afAuth: AngularFireAuth) { 
    firebase.auth().onAuthStateChanged(user => { if (user) 
      { this.currentUser = user; this.users_student = firebase.firestore().doc(`/users/${user.uid}`);}}); 
      this.currentUser = firebase.auth().currentUser; 
      this.users_student = firebase.firestore().doc(`/users/${this.currentUser.uid}`);
  }


  getUserProfileStudent(): firebase.firestore.DocumentReference {
    return this.users_student;
  }

  updateName(firstName: string, lastName: string): Promise<any> {
    return this.users_student.update({ firstName, lastName })
  }

  // updateDOB(birthDate: string): Promise<any> {
  //   return this.userProfile.update({ birthDate });
  // }

  updateEmail(newEmail: string, password: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      password
    );
  
    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        this.currentUser.updateEmail(newEmail).then(() => {
          this.users_student.update({ email: newEmail });
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );
  
    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        this.currentUser.updatePassword(newPassword).then(() => {
          console.log('Password Changed');
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  update_student(recordID,record){
    this.firestore.doc('users/' + recordID).update(record);
  }

  read_student() {
    return this.firestore.collection('users').snapshotChanges();
  }

  
  //uploadtask

  setUser(user: user) {
    this.user = user
}

  getUID() {

    if(!this.user){
        if(this.afAuth.auth.currentUser) {
            const user = this.afAuth.auth.currentUser
            this.setUser({
                name,
                email: user.email,
                uid: user.uid
            })
            return user.uid
        } else {
            throw new Error("User not logged in")
        }
    } else {
        return this.user.uid
    }
}


}