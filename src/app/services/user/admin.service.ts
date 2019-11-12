import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public userProfile: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;
    public loading: HTMLIonLoadingElement;
    toast: any;
  
  
  constructor(private authService: AuthService,
    public loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
    private alertCtrl: AlertController,
    public toastController: ToastController) { 
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

  updatePassword(oldPassword: string, confirmpw: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );
  
    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        this.currentUser.updatePassword(confirmpw).then(() => {
          console.log('Password Changed');
      
          this.userProfile.update({ change:false, password:confirmpw })
          // return this.showToast();
          console.log('success')

        });
      })
      
      .catch(async error => {
      alert(error);
       
      });
  }

  showToast() {
    this.toast = this.toastController.create({
      message: 'successfully changed password',
      duration: 2000
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  }
  HideToast(){
    this.toast = this.toastController.dismiss();
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