import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public users_student: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;

  constructor(private firestore: AngularFirestore) { 
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


}
