import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';


interface user {
  name: string,
  email: string,
  uid: string
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public userProfile: firebase.firestore.DocumentReference;
  private user: user;
  studentSS: any;
  hello: any;
  public users_student: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;
  public loading: HTMLIonLoadingElement;
  toast: any;
  student_id: any;
  public userInformation: any;
  public deleteusers: any;
  start;
  end;

  constructor(private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private router: Router, ) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) { this.currentUser = user; this.users_student = firebase.firestore().doc(`/users/${user.uid}`); }
    });
    this.currentUser = firebase.auth().currentUser;
    this.users_student = firebase.firestore().doc(`/users/${this.currentUser.uid}`);




  }


  getUserProfileStudent(): firebase.firestore.DocumentReference {
    return this.users_student;
  }





  updateName(displayName: string): Promise<any> {
    return this.users_student.update({ displayName })
  }

  updatecontact(telno: string): Promise<any> {
    return this.users_student.update({ contact_no: telno })
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

  // updatePassword(newPassword: string, oldPassword: string): Promise<any> {
  //   const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
  //     this.currentUser.email,
  //     newPassword
  //   );

  //   return this.currentUser
  //     .reauthenticateWithCredential(credential)
  //     .then(() => {
  //       this.currentUser.updatePassword(oldPassword).then(() => {
  //         console.log('Password Changed');

  //         this.users_student.update({ change: false })

  //       });
  //     })

  //     .catch(async error => {
  //       this.loading = await this.loadingCtrl.create();
  //       await this.loading.present();
  //       this.loading.dismiss().then(async () => {
  //         const alert = await this.alertCtrl.create({
  //           message: error.message,
  //           buttons: [{ text: 'Ok', role: 'cancel' }],
  //         });
  //         await alert.present();
  //       });
  //       console.error(error);

  //     });
  // }

  async updateNotif() {
    await this.users_student.update({ notify: false });
    console.log('jekking');

  }

  async notifFalse() {
    await this.users_student.update({ notify: false });
    console.log('false dah');
  }

  async createTrue() {
    await this.users_student.update({ notify: true });
    console.log('mau true');
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

          this.users_student.update({ password: confirmpw, change: false })
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

  update_Password(oldPassword: string, confirmpw: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );

    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        this.currentUser.updatePassword(confirmpw).then(() => {
          console.log('Password Changed');

          this.users_student.update({ password: confirmpw, change: false })
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
                    cssClass: 'secondary',
                    handler: () => {
                      this.router.navigateByUrl('/home-student');
                    }
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
  update_student(recordID, record) {
    this.firestore.doc('users/' + recordID).update(record);
  }

  read_student() {
    return this.firestore.collection('users', ref => ref.where('role', '==', 'student')).snapshotChanges();

  }

  read_pbsupervisor_student() {
    return this.firestore.collection('users', ref => ref.where('role', '==', 'student').where('pbsupervisor', '==', 'NA')).snapshotChanges();

  }


  student() {
    return this.firestore.collection('users', ref => ref.where('displayName', '==', this.currentUser.displayName)).snapshotChanges();

  }


  show_student() {
    return this.firestore.collection('users', ref => ref.where('role', '==', 'student'));
  }




  //uploadtask

  setUser(user: user) {
    this.user = user
  }

  getUID() {

    if (!this.user) {
      if (this.afAuth.auth.currentUser) {
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

    const alertsuccessdelete = this.alertCtrl.create({
      message: 'Successfully Deleted Student',
      buttons: [{ text: 'Ok', role: 'cancel' }],
    })

    this.student_id = record_id.id;
    this.deleteusers = firebase.firestore().doc(`users/${this.student_id}`)

    return this.loadingCtrl.create({
      message: 'Deleting Data, Please Wait'
    }).then((overlay) => {
      this.loading = overlay;
      this.loading.present().then(() => {
        this.deletetasks().then(() => {
          this.deleteattendance().then(() => {
            this.deleteattendancepresent().then(() => {
              this.deleteusers.delete().then(async () => {
                console.log(this.deleteusers, 'apakan ni?')
                this.loading.dismiss();
                console.log("Success Delete");
                (await alertsuccessdelete).present();
              })
            })
          })
        })
      })
    })
  }



  deletetasks() {
    const db = firebase.firestore();
    var collectionPath = `users/${this.student_id}/tasks`
    this.deleteCollection(db, collectionPath)

    return new Promise((resolve, reject) => {
      this.throwAway(resolve, reject);
    })
  }



  deleteattendance() {
    const db = firebase.firestore()
    var collectionPath = `/users/${this.student_id}/attendance`
    this.deleteCollection(db, collectionPath)
    return new Promise((resolve, reject) => {
      this.throwAway(resolve, reject);
    })
  }

  throwAway(resolve, reject) {
    try {
      resolve()
      console.log("Resolve")
    }
    catch (reject) {
      console.log("reject")
    }
  }

  deleteattendancepresent() {
    const db = firebase.firestore()
    var collectionPath = `/users/${this.student_id}/attendance/${'month'}/present`
    this.deleteCollection(db, collectionPath)
    return new Promise((resolve, reject) => {
      this.throwAwayPresent(resolve, reject);
    })
  }

  throwAwayPresent(resolve, reject) {
    try {
      resolve()
      console.log("Resolve")
    }
    catch (reject) {
      console.log("reject")
    }
  }




  deletestudent() {

    this.userInformation = this.firestore.doc('users/' + this.student_id).delete();
    // this.userInformation = firebase.firestore().doc(`/users/${record_id}`);
  }

  deleteCollection(db, collectionPath) {

    let collectionRef = db.collection(collectionPath);
    let query = collectionRef

    return new Promise((resolve, reject) => {
      this.deleteQueryBatch(db, query, resolve, reject);
    });
  }

  deleteQueryBatch(db, query, resolve, reject) {
    query.get()
      .then((snapshot) => {
        // When there are no documents left, we are done
        if (snapshot.size == 0) {
          console.log("hai")
          return 0;
        }

        // Delete documents in a batch
        let batch = db.batch();
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });

        return batch.commit().then(() => {
          console.log("wew")
          this.deleteQueryBatch(db, query, resolve, reject);
          console.log("weew2")
          return snapshot.size;
        });
      }).then((numDeleted) => {
        if (numDeleted === 0) {
          console.log("haha")
          resolve();
          return;
        }

      })
      .catch(reject);
  }

  // read_student_task(record){
  //   return this.firestore.collectionGroup('tasks').snapshotChanges();
  // }

  read_student_task(jubs, start, end) {
    console.log(jubs, start, end, 'ani step 4');
    return this.firestore.collection('users').doc(jubs).collection('tasks', ref => ref.where('pickdate', '>=', start).where('pickdate', '<=', end).orderBy('pickdate', 'desc')).snapshotChanges();
    // return this.firestore.collection('users').doc(jubs).collection('tasks', ref => ref.orderBy('pickdate', 'desc')).snapshotChanges();
  }

  read_student_task2(jubs, start) {
    console.log(jubs, start, 'ani step 4');
    return this.firestore.collection('users').doc(jubs).collection('tasks', ref => ref.where('pickdate', '==', start)).snapshotChanges();
    // return this.firestore.collection('users').doc(jubs).collection('tasks', ref => ref.orderBy('pickdate', 'desc')).snapshotChanges();
  }

  read_student_attendance(jubs) {

    console.log(jubs, 'ani step 4');
    return this.firestore.collection('users').doc(jubs).collection('attendance').doc('month').collection('present', ref => ref.orderBy('timeinstamp', 'desc')).snapshotChanges();
  }

  // read_student_attendance(){
  //   return this.firestore.collectionGroup('attendance').snapshotChanges();
  // }

  read_gcstudent_attendance() {
    return this.firestore.collectionGroup('attendance').snapshotChanges();
  }

  // return this.firestore.collection('users').doc('').collection('tasks').snapshotChanges();


}
