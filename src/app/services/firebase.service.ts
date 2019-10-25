import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
 
  name : any;

  private snapshotChangesSubscription: any;
  public currentUser: firebase.User;
  userProfile: any;
  gc: any;
  pbs: any;
  is: any;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ){}

  //DailyTask
  createTask(value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('users').doc(currentUser.uid).collection('tasks').add({
        title: value.title,
        description: value.description,
        image: value.image,
        pickdate: value.pickdate,
        name: currentUser.displayName,
        email: currentUser.email,
        created: firebase.firestore.FieldValue.serverTimestamp()

      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
  
  getTasks(){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = this.afs.collection('users').doc(currentUser.uid).collection('tasks').snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      })
    })
  }

  getTask(taskId){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = this.afs.doc<any>('users/' + currentUser.uid + '/tasks/' + taskId).valueChanges()
          .subscribe(snapshots => {
            resolve(snapshots);
          }, err => {
            reject(err)
          })
        }
      })
    });
  }

  read_task(){
    let currentUser = firebase.auth().currentUser;
    return this.afs.collection('users').doc(currentUser.uid).collection('tasks').snapshotChanges();
  }

  unsubscribeOnLogOut(){
    //remember to unsubscribe from the snapshotChanges
    this.snapshotChangesSubscription.unsubscribe();
  }

  updateTask(taskKey, value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('users').doc(currentUser.uid).collection('tasks').doc(taskKey).set(value)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  deleteTask(taskKey){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('users').doc(currentUser.uid).collection('tasks').doc(taskKey).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }



  //Attendance
  createAttendance(value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('users',  ref => ref.where('displayName', '==', currentUser.displayName)).snapshotChanges()
      .subscribe(data => {
 
        this.gc = data.map(e => {
             return {
            gc: e.payload.doc.data()['gc'],
            pbsupervisor: e.payload.doc.data()['pbsupervisor'],
            isupervisor: e.payload.doc.data()['isupervisor'],
          };
        })
        console.log(this.gc);
    
      });

      this.afs.collection('users',  ref => ref.where('displayName', '==', currentUser.displayName)).snapshotChanges()
      .subscribe(data => {
 
        this.pbs = data.map(e => {
             return {
            pbsupervisor: e.payload.doc.data()['pbsupervisor'],
          };
        })
        console.log(this.pbs);
    
      });
      
      this.afs.collection('users',  ref => ref.where('displayName', '==', currentUser.displayName)).snapshotChanges()
      .subscribe(data => {
 
        this.is = data.map(e => {
             return {
            isupervisor: e.payload.doc.data()['isupervisor'],
          };
        })
        console.log(this.is);
    
      });

      this.afs.collection('users').doc(currentUser.uid).collection('attendance').add({
        address: value.address,
      // timeinpicker: value.timeinpicker,
      // timeoutpicker: value.timeoutpicker,
      geoLatitude: value.geoLatitude,
      geoLongitude: value.geoLongitude,
      timeinstamp: value.timeinstamp,
      name: currentUser.displayName,
      email: currentUser.email,
      gc: this.gc,
      is: this.is,
      pbs: this.pbs,
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  
  }
  
  getAttendances(){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = this.afs.collection('users').doc(currentUser.uid).collection('attendance').snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      })
    })
  }

  getAttendance(AttendanceId){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = this.afs.doc<any>('users/' + currentUser.uid + '/attendance/' + AttendanceId).valueChanges()
          .subscribe(snapshots => {
            resolve(snapshots);
          }, err => {
            reject(err)
          })
        }
      })
    });
  }




  readAttendance(){
    let currentUser = firebase.auth().currentUser;
    return this.afs.collection('users').doc(currentUser.uid).collection('attendance').snapshotChanges();
  }


  updateAttendance(attendanceID, value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('users').doc(currentUser.uid).collection('attendance').doc(attendanceID).update({
        timeoutstamp: firebase.firestore.FieldValue.serverTimestamp(),
        timeoutaddress: value.address,
        timeoutLatitude: value.timeoutLatitude,
        timeoutLongitude: value.timeoutLongitude,
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
  
  
  deleteattendance(attendance_id) {
    let currentUser = firebase.auth().currentUser;
    this.afs.doc(`/users/${this.currentUser.uid}/attendance` + attendance_id).delete();
  }

  deleteAttendance(attendanceKey){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('users').doc(currentUser.uid).collection('attendance').doc(attendanceKey).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
  


//images

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  uploadImage(imageURI, randomId){
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child(randomId);
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          snapshot.ref.getDownloadURL()
          .then(res => resolve(res))
        }, err => {
          reject(err);
        })
      })
    })
  }
}