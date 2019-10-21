import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class IsupervisorService {
  public users_isupervisor: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;

  constructor(private firestore: AngularFirestore) { 
    firebase.auth().onAuthStateChanged(user => { if (user) 
      { this.currentUser = user; this.users_isupervisor = firebase.firestore().doc(`/users/${user.uid}`);}}); 
      this.currentUser = firebase.auth().currentUser; 
      this.users_isupervisor = firebase.firestore().doc(`/users/${this.currentUser.uid}`);
  }


  getUserProfileisupervisor(): firebase.firestore.DocumentReference {
    return this.users_isupervisor;
  }

  updateName(name: string): Promise<any> {
    return this.users_isupervisor.update({ name })
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
          this.users_isupervisor.update({ email: newEmail });
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      newPassword
    );
  
    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        this.currentUser.updatePassword(oldPassword).then(() => {
          console.log('Password Changed');

          this.users_isupervisor.update({ change:false })

        });
      })
      
      .catch(error => {
        console.error(error);
      });
  }

  update_isupervisor(recordID,record){
    this.firestore.doc('users/' + recordID).update(record);
  }

  read_isupervisor() {
    return this.firestore.collection('users',  ref => ref.where('role', '==', 'isupervisor')).snapshotChanges();
  }

  read_isupervisor_student() {
    return this.firestore.collection('users',  ref => ref.where('isupervisor', '==', this.currentUser.displayName)).snapshotChanges();
  }

  delete_isupervisor(record_id) {
    this.firestore.doc('users/' + record_id).delete();
  }


}