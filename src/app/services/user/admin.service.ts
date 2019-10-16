import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public userProfile: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;
  
  constructor(private authService: AuthService,
    private firestore: AngularFirestore) { 
    firebase.auth().onAuthStateChanged(user => { if (user) 
      { this.currentUser = user; this.userProfile = firebase.firestore().doc(`users/${user.uid}`);}}); 
      this.currentUser = firebase.auth().currentUser; 
      this.userProfile = firebase.firestore().doc(`users/${this.currentUser.uid}`);
  }

  getUserProfile(): firebase.firestore.DocumentReference {
    return this.userProfile;
  }

  getUserProfileAdmin(): firebase.firestore.DocumentReference {
    return this.userProfile;
  }

  updateName(displayName: string): Promise<any> {
    return this.userProfile.update({ displayName })
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
          this.userProfile.update({ email: newEmail });
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

          this.userProfile.update({ change:false })

        });
      })
      
      .catch(error => {
        console.error(error);
      });
  }

  update_Admin(recordID,record){
    this.firestore.doc('users/' + recordID).update(record);
  }

  read_Admin() {
    return this.firestore.collection('users',  ref => ref.where('role', '==', 'admin')).snapshotChanges();
  }

  delete_admin(record_id) {
    this.firestore.doc('users/' + record_id).delete();
  }


}