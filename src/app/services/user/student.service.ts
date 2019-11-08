import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';


interface user {
  name: string,
  email: string,
  uid: string
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
  private user: user;
  studentSS: any;
  hello: any;
  public users_student: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;
  public loading: HTMLIonLoadingElement;
  toast: any;
  
  constructor(private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public toastController: ToastController) { 
    firebase.auth().onAuthStateChanged(user => { if (user) 
      { this.currentUser = user; this.users_student = firebase.firestore().doc(`/users/${user.uid}`);}}); 
      this.currentUser = firebase.auth().currentUser; 
      this.users_student = firebase.firestore().doc(`/users/${this.currentUser.uid}`);
  }


  getUserProfileStudent(): firebase.firestore.DocumentReference {
    return this.users_student;
  }



  

  updateName(displayName: string): Promise<any> {
    return this.users_student.update({ displayName })
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
      newPassword
    );
  
    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        this.currentUser.updatePassword(oldPassword).then(() => {
          console.log('Password Changed');

          this.users_student.update({ change:false })

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

  update_student(recordID,record){
    this.firestore.doc('users/' + recordID).update(record);
  }

  read_student() {
    return this.firestore.collection('userscsv',  ref => ref.where('role', '==', 'student')).snapshotChanges();
    
  }

  student() {
    return this.firestore.collection('users',  ref => ref.where('displayName', '==', this.currentUser.displayName)).snapshotChanges();
    
  }

 

  
  read_student_nws6() {
    return this.firestore.collection('users',  ref => ref.where('role', '==', 'student').where('group_code', '==', 'NWS06')).snapshotChanges();
    
  }

  read_student_nws7() {
    return this.firestore.collection('users',  ref => ref.where('role', '==', 'student').where('group_code', '==', 'NWS07')).snapshotChanges();
    
  }

  read_student_wbd() {
    return this.firestore.collection('users',  ref => ref.where('role', '==', 'student').where('group_code', '==', 'WBD')).snapshotChanges();
    
  }

  read_student_dme() {
    return this.firestore.collection('users',  ref => ref.where('role', '==', 'student').where('group_code', '==', 'DME')).snapshotChanges();
    
  }
  


  show_student(){
    return this.firestore.collection('users',  ref => ref.where('role', '==', 'student'));
  }
  
 

  
  //uploadtask

  setUser(user: user) {
    this.user = user
}

  getUID() {

    if(!this.user){
        if(this.afAuth.auth.currentUser) {
            const user = this.afAuth.auth.currentUser
            this.setUser({
                name,
                email: user.email,
                uid: user.uid
            })
            return user.uid
        } else {
            throw new Error("User not logged in")
        }
    } else {
        return this.user.uid
    }
}

delete_student(record_id) {
  this.firestore.doc('users/' + record_id).delete();
}

// read_student_task(record){
//   return this.firestore.collectionGroup('tasks').snapshotChanges();
// }

read_student_task(jubs){

  console.log(jubs , 'ani step 4');
  return this.firestore.collection('users').doc(jubs).collection('tasks').snapshotChanges();
}

read_student_attendance(jubs){

  console.log(jubs , 'ani step 4');
  return this.firestore.collection('users').doc(jubs).collection('attendance').snapshotChanges();
}

// read_student_attendance(){
//   return this.firestore.collectionGroup('attendance').snapshotChanges();
// }

read_gcstudent_attendance(){
  return this.firestore.collectionGroup('attendance').snapshotChanges();
}

// return this.firestore.collection('users').doc('').collection('tasks').snapshotChanges();


}
