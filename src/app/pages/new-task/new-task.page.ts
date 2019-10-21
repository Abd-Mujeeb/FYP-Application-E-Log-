import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import * as firebase from 'firebase';
@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {

  validations_form: FormGroup;
  image: any;

  constructor(
    private imagePicker: ImagePicker,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public router: Router,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private webview: WebView,
    private localNotifications: LocalNotifications
  ) { }

  ngOnInit() {
    this.resetFields();
  }

  resetFields(){
   this.image = "./assets/imgs/default_image.jpg";
    this.validations_form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      pickdate: new FormControl('',Validators.required),
    });
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
    this.firebaseService.createTask(data)
    .then(
      res => {
        this.router.navigate(["/home-student"]);
        toast.present();
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
          height: 400,
          width: 400,
          maximumImagesCount: 5,
         
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
      loading.dismiss();
      toast.present();
    }, err =>{
      console.log(err);
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  
  tasknotification(seconds: number){
    this.localNotifications.schedule([{
      id: 1,
      title: `E-log`,
      text: `Your task successfully uploaded`,
      trigger: {
        // at: new Date(new Date().getTime() + seconds)
        in: seconds,
        unit: ELocalNotificationTriggerUnit.SECOND},     
    },{
      id: 2,
      title: `You haven't upload any task for today`,
      text: `Please upload your Task. Do you want to upload now?`,
      trigger:{ at: new Date(new Date().getTime() + 86400 * 1000),
      },
      actions: [
        {id: 'yes', title: 'Yes'},
        {id: 'no', title: 'No'}
    ]
    },
  ]);

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

}
