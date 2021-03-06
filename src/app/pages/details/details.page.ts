import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, ToastController, AlertController, ModalController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { FirebaseService } from 'src/app/services/firebase.service';
import * as firebase from 'firebase';
import { ImageModalPage } from '../image-modal/image-modal.page';

import { StudentService } from 'src/app/services/user/student.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  validations_form: FormGroup;
  image: any;
  item: any;
  load: boolean = false;
  notifyz: string;
  
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
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private webview: WebView,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private localNotifications: LocalNotifications,
    private modalController: ModalController,
    public studentService: StudentService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.route.data.subscribe(routeData => {
     let data = routeData['data'];
     if (data) {
       this.item = data;
       this.image = this.item.image;
     }
    })
    this.validations_form = this.formBuilder.group({
      title: new FormControl(this.item.title, Validators.required),
      description: new FormControl(this.item.description, Validators.required),
      pickdate: new FormControl(this.item.pickdate, Validators.required),
      
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
      message: 'Task updated successfully',
      duration: 3000
    });
    
    let data = {
      title: value.title,
      description: value.description,
      pickdate: value.pickdate,
      name: this.item.name,
      email: this.item.email,
      image: this.image,
      created: this.item.created,
    
    }
    this.firebaseService.updateTask(this.item.id,data)
    .then(
      res => {
        this.router.navigate(["/home-student"]);
        toast.present();
        this.tasknotification();
      }
    )
  }

  async delete() {

     


 
    const alertdeleted = await this.alertCtrl.create({
      header: '',
      message: 'Task Deleted Successfully',
      buttons: ['OK']
    });
    const alert = await this.alertCtrl.create({
      header: 'Confirm',
      message: 'Do you want to delete ' + this.item.title + '?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => {
        this.studentService.notifFalse().then(()=>
        
          this.studentService
          .getUserProfileStudent()
          .get()
          .then( userProfileStudentSnapshot => {
        this.notifyz = userProfileStudentSnapshot.data()['notify'];
        }));

            this.firebaseService.deleteTask(this.item.id)
            .then(
              res => {
                alertdeleted.present();
                this.router.navigate(["/home-student"]);
              },
              err => console.log(err)
            )
          }
        }
      ]
    });
    await alert.present();
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
          quality: 100,
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
    // let image_to_convert = 'http://localhost:8080/_file_' + image;
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

  tasknotification(){
    this.localNotifications.schedule([{
      title: `E-log`,
      text: `Task Updated Successfully`,
    
    }]);

  }

}