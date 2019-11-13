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
    public toastController: ToastController,
    public loadingController: LoadingController) { 
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
      
          this.userProfile.update({password:confirmpw })
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

  read_specific_admin(nyummy){
    console.log(nyummy, 'ani step 4');
    return this.firestore.collection('users', ref => ref.where(firebase.firestore.FieldPath.documentId(), '==', nyummy)).snapshotChanges();


  }

  delete_specific_admin(Email: string, Password: string, record) {
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
                this.deleting_admin(record);
                this.loading.dismiss();
                console.log("Success Deleting");
    
              })
            })
          })
      }
    
    
    
      deleting_admin(recordID) {
        console.log(recordID, 'part 3')
        this.firestore.doc('users/' + recordID.id).delete();
        console.log('deleting success');
      }
    

  delete_admin(record_id) {
    this.firestore.doc('users/' + record_id).delete();
  }


}