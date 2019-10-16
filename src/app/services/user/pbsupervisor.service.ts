import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PbsupervisorService {

  public users_pbsupervisor: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;
  public value1: any[];
  public value2: any[];
  public eventListRef: firebase.firestore.CollectionReference;

  constructor(private firestore: AngularFirestore) { 
    firebase.auth().onAuthStateChanged(user => { if (user) 
      { this.currentUser = user; this.users_pbsupervisor = firebase.firestore().doc(`/users/${user.uid}`);}}); 
      this.currentUser = firebase.auth().currentUser; 
      this.users_pbsupervisor = firebase.firestore().doc(`/users/${this.currentUser.uid}`);
  }


  getUserProfilePbsupervisor(): firebase.firestore.DocumentReference {
    return this.users_pbsupervisor;
  }

  updateName(displayName: string): Promise<any> {
    return this.users_pbsupervisor.update({ displayName })
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
          this.users_pbsupervisor.update({ email: newEmail });
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

          this.users_pbsupervisor.update({ change:false })

        });
      })
      
      .catch(error => {
        console.error(error);
      });
  }

  update_pbsupervisor(recordID,record){
    this.firestore.doc('users/' + recordID).update(record);
  }

  read_pbsupervisor() {
    return this.firestore.collection('users',  ref => ref.where('role', '==', 'pbsupervisor')).snapshotChanges();
  }
  
  read_pbsupervisor_mujib(){
    return this.firestore.collection('users', ref => ref.where('pbsupervisor', '==', 'Abdul Mujib  Bin Irfan')).snapshotChanges();
  }

  delete_pbsupervisor(record_id) {
    this.firestore.doc('users/' + record_id).delete();
  }




}