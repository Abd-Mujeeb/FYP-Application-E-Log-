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
export class GcService {

  public users_gc: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;
  public loading: HTMLIonLoadingElement;
    toast: any;
  
  constructor(private firestore: AngularFirestore,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastController: ToastController) { 
    firebase.auth().onAuthStateChanged(user => { if (user) 
      { this.currentUser = user; this.users_gc = firebase.firestore().doc(`/users/${user.uid}`);}}); 
      this.currentUser = firebase.auth().currentUser; 
      this.users_gc = firebase.firestore().doc(`/users/${this.currentUser.uid}`);
  }

  getUserProfileGc(): firebase.firestore.DocumentReference {
    return this.users_gc;
  }

  updateName(name: string): Promise<any> {
    return this.users_gc.update({ name })
  }


  updateEmail(newEmail: string, password: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      password
    );
  
    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        this.currentUser.updateEmail(newEmail).then(() => {
          this.users_gc.update({ email: newEmail });
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

          this.users_gc.update({ change:false })

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

  update_gc(recordID,record){
    this.firestore.doc('users/' + recordID).update(record);
  }

  read_gc() {
    return this.firestore.collection('users',  ref => ref.where('role', '==', 'gc')).snapshotChanges();
  }

  delete_gc(record_id) {
    this.firestore.doc('users/' + record_id).delete();
  }

  read_gcstudent() {
    return this.firestore.collection('users',  ref => ref.where('gc', '==', this.currentUser.displayName)).snapshotChanges();
    
  }


}



