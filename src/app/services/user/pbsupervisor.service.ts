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
  public userProfile: firebase.firestore.DocumentReference;
  public users_pbsupervisor: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;
  public eventListRef: firebase.firestore.CollectionReference;
  public loading: HTMLIonLoadingElement;
  toast: any;

  constructor(
    private firestore: AngularFirestore,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    public loadingController: LoadingController
    
    ) {

      
    firebase.auth().onAuthStateChanged(user => {
      if (user) { this.currentUser = user; this.users_pbsupervisor = firebase.firestore().doc(`/users/${user.uid}`); }
    });


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
      
          this.users_pbsupervisor.update({password:confirmpw })
          // return this.showToast();
          console.log('success')

      this.loadingController.create({
            message: 'Please wait..',
            duration: 3000,
            spinner: 'bubbles'
          }).then((res) => {
            res.present();
        
            res.onDidDismiss().then(async(dis) => {
              console.log('Loading dismissed! after 3 Seconds');
              const alert = await this.alertCtrl.create({
                header: 'Notification',
                message: 'Your Password has successfully changed',
                buttons: [
                  {
                    text: 'Okay',
                    cssClass: 'secondary'
                  },
                ]
              });
          
              await alert.present();
             
              
            });
            
          });

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
  update_pbsupervisor(recordID, record) {
    this.firestore.doc('users/' + recordID).update(record);
  }

  read_pbsupervisor() {
    return this.firestore.collection('users', ref => ref.where('role', '==', 'pbsupervisor')).snapshotChanges();
  }

  read_mystudent() {
    return this.firestore.collection('users', ref => ref.where('pbsupervisor', '==', this.currentUser.displayName)).snapshotChanges();
  }

  read_pbsupervisor_attendance() {
    return this.firestore.collection('attendance').snapshotChanges();
  }

  delete_pbsupervisor(record_id) {
    this.firestore.doc('users/' + record_id).delete();
  }



  //see specific student
  //  read_student(jubs){

  //   console.log(jubs , 'ani step 4');
  //   return this.firestore.collection('users', ref => ref.where('uid', '==' , jubs)).snapshotChanges();
  // }

  read_student(jubs) {

    console.log(jubs, 'ani step 4');


    return this.firestore.collection('users', ref => ref.where(firebase.firestore.FieldPath.documentId(), '==', jubs)).snapshotChanges();



  }



  selecting_student(recordID) {
    console.log(recordID, 'part 3')
    this.firestore.collection('users').doc(recordID).update({
      pbsupervisor: firebase.auth().currentUser.displayName,
      idpbsupervisor: firebase.auth().currentUser.uid,

    })
    console.log('selecting success');
  }





  deselect_student(Email: string, Password: string, record) {
console.log(record, 'what is record?');
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      Email, Password
    );
    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        this.loadingCtrl.create({
          message: 'Deselecting Student, Please Wait'
        }).then((overlay) => {
          this.loading = overlay;
          this.loading.present().then(() => {
            this.deselecting_student(record);
            this.loading.dismiss();
            console.log("Success Deselecting");

          })
        })
      })
  }



  deselecting_student(recordID) {
    console.log(recordID, 'part 3')
    this.firestore.collection('users').doc(recordID.id).update({
      pbsupervisor: '',

    })
    console.log('deselecting success');
  }


}



