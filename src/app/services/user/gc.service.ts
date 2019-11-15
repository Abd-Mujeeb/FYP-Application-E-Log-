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

  public userProfile: firebase.firestore.DocumentReference;
  public users_gc: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;
  public loading: HTMLIonLoadingElement;
  toast: any;

  constructor(private firestore: AngularFirestore,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    public loadingController: LoadingController) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) { this.currentUser = user; this.users_gc = firebase.firestore().doc(`/users/${user.uid}`); }
    });
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

          this.users_gc.update({ password: confirmpw })
          // return this.showToast();
          console.log('success')

          this.loadingController.create({
            message: 'Please wait..',
            duration: 3000,
            spinner: 'bubbles'
          }).then((res) => {
            res.present();

            res.onDidDismiss().then(async (dis) => {
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

  update_gc(recordID, record) {
    this.firestore.doc('users/' + recordID).update(record);
  }

  updateProfile(profileID, value) {
    console.log(profileID, value, 'hello there');
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('users').doc(profileID).update({
        displayName: value.displayName,
        email: value.email,
        contact_no: value.contact_no,
        school_dept: value.school_dept,
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  delete_specific_gc(Email: string, Password: string, record) {
    console.log(record, 'what is record?');
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      Email, Password
    );
    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        this.loadingCtrl.create({
          message: 'Deleting user, Please Wait'
        }).then((overlay) => {
          this.loading = overlay;
          this.loading.present().then(() => {
            this.deleting_gc(record);
            this.loading.dismiss();
            console.log("Success Deleting");

          })
        })
      })
  }

  deleting_gc(recordID) {
    console.log(recordID, 'part 3')
    this.firestore.doc('users/' + recordID.id).delete();
    console.log('deleting success');
  }

  read_gc() {
    return this.firestore.collection('users', ref => ref.where('role', '==', 'gc')).snapshotChanges();
  }

  delete_gc(record_id) {
    this.firestore.doc('users/' + record_id).delete();
  }

  read_gcstudent() {
    return this.firestore.collection('users', ref => ref.where('gc', '==', this.currentUser.displayName)).snapshotChanges();

  }

  read_gcstudent_attendance() {
    return this.firestore.collectionGroup('attendance', ref => ref.where('gc', 'array-contains', { gc: this.currentUser.displayName })).snapshotChanges();
  }

  read_student(jubs) {

    console.log(jubs, 'ani step 4');


    return this.firestore.collection('users', ref => ref.where(firebase.firestore.FieldPath.documentId(), '==', jubs)).snapshotChanges();



  }



}



