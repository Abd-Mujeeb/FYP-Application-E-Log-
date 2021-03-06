import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import * as firebase from 'firebase';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { StudentService } from 'src/app/services/user/student.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {

  validations_form: FormGroup;
  image: any;
  public notify = true;
  notifz: string;

  
  sliderOpts = {
    zoom: false,
    sliderPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 20
  };


  constructor(
    private imagePicker: ImagePicker,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public router: Router,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private webview: WebView,
    private localNotifications: LocalNotifications,
    private modalController: ModalController,
    public studentService: StudentService,

  ) { }

  ngOnInit() {
    this.resetFields();

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .doc(`/users/${user.uid}`)
          .get()
          .then(userProfileSnapshot => {
            this.notify = userProfileSnapshot.data().notify;
          });
      }
      
    });
  }

  resetFields(){
   this.image = "./assets/imgs/default_image.jpg";
    this.validations_form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      pickdate: new FormControl('',Validators.required),
    });
  }

  openPreview(image){
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        image: this.image
      }
    }).then(modal => modal.present());
 
  }

  
  async onSubmit(value){
    const toast = await this.toastCtrl.create({
      message: 'Task created successfully',
      duration: 3000
    });
    let currentUser = firebase.auth().currentUser;
    let data = {
      title: value.title,
      description: value.description,
      image: this.image,
      pickdate: value.pickdate,
      name: currentUser.displayName,
      email: currentUser.email,
      created: firebase.firestore.FieldValue.serverTimestamp()
    }
    console.log(data, this.image , 'image kali ni')
    this.firebaseService.createTask(data)
    .then(
      res => {
        this.router.navigate(["/home-student"]);
        toast.present();
        this.uploadtaskNotification();
        this.updateNotification();
      }
    )
  }


  openImagePicker(){
    this.imagePicker.hasReadPermission()
    .then((result) => {
      if(result == false){
        // no callbacks required as this opens a popup which returns async
        this.imagePicker.requestReadPermission();
      }
      else if(result == true){
        this.imagePicker.getPictures({
           maximumImagesCount: 1,
         
        }).then(
          (results) => {
            for (var i = 0; i < results.length; i++) {
              this.uploadImageToFirebase(results[i]);
            }
          }, (err) => console.log(err)
        );
      }
    }, (err) => {
      console.log(err);
    });
  }

  async uploadImageToFirebase(image){
    const loading = await this.loadingCtrl.create({
      message: 'Uploading...'
    });
    const toast = await this.toastCtrl.create({
      message: 'Image was updated successfully',
      duration: 3000
    });
    this.presentLoading(loading);
    let image_src = this.webview.convertFileSrc(image);
    let randomId = Math.random().toString(36).substr(2, 5);

    //uploads img to firebase storage
    this.firebaseService.uploadImage(image_src, randomId)
    .then(photoURL => {
      this.image = photoURL;
      console.log(this.image, 'patutnya image in array')
      loading.dismiss();
      toast.present();
    }, err =>{
      console.log(err);
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  
 async updateNotification(){
  await this.studentService.createTrue().then(()=>
  this.studentService
    .getUserProfileStudent()
    .get()
    .then( userProfileStudentSnapshot => {
      this.notifz = userProfileStudentSnapshot.data()['notify'];
    })); 
  //  this.notify= false;
}



uploadtaskNotification() {
    this.localNotifications.schedule([{
      title: `E-log`,
      text: `Your task successfully uploaded`,     
  
    },
  ]);
}


  }

  // testing(){
  //   this.localNotifications.schedule([{
  //     id: 1,
  //     title: `E-log`,
  //     text: `Your task successfully uploaded`,
  //   },{
  //     id: 2,
  //     title: `You haven't upload any task for today`,
  //     text: `Please upload your Task`,
  //     trigger:{ at: new Date(new Date().getTime() + 82800 * 1000),
  //   },
  //   }]);
  // }



