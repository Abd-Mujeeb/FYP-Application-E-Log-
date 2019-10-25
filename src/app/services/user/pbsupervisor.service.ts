import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PbsupervisorService {

  public users_pbsupervisor: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;
  public eventListRef: firebase.firestore.CollectionReference;
  public loading: HTMLIonLoadingElement;
  toast: any;

  constructor(private firestore: AngularFirestore,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastController: ToastController) { 
    firebase.auth().onAuthStateChanged(user => { if (user) 
      { this.currentUser = user; this.users_pbsupervisor = firebase.firestore().doc(`/users/${user.uid}`);}}); 
      this.currentUser = firebase.auth().currentUser; 
      this.users_pbsupervisor = firebase.firestore().doc(`/users/${this.currentUser.uid}`);
  }


  getUserProfilePbsupervisor(): firebase.firestore.DocumentReference {
    return this.users_pbsupervisor;
  }

  updateName(name: string): Promise<any> {
    return this.users_pbsupervisor.update({ name })
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
      newPassword
    );
  
    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        this.currentUser.updatePassword(oldPassword).then(() => {
          console.log('Password Changed');

          this.users_pbsupervisor.update({ change:false })

        });
      })
      
      .catch(async error => {
        this.loading = await this.loadingCtrl.create();
      await this.loading.present();
        this.loading.dismiss().then(async () => {
          const alert = await this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }],
          });
          await alert.present();
        });
        console.error(error);
       
      });
  }

  update_pbsupervisor(recordID,record){
    this.firestore.doc('users/' + recordID).update(record);
  }

  read_pbsupervisor() {
    return this.firestore.collection('users',  ref => ref.where('role', '==', 'pbsupervisor')).snapshotChanges();
  }
  
  read_mystudent(){
    return this.firestore.collection('users', ref => ref.where('pbsupervisor', '==', this.currentUser.displayName)).snapshotChanges();
  }

  read_pbsupervisor_attendance(){
    return this.firestore.collectionGroup('attendance', ref=> ref.where('pbs', 'array-contains', {pbs: this.currentUser.displayName})).snapshotChanges();
  }

  delete_pbsupervisor(record_id) {
    this.firestore.doc('users/' + record_id).delete();
  }

 




}