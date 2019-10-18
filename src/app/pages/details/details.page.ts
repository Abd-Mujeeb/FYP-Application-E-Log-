import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { FirebaseService } from 'src/app/services/firebase.service';
import * as firebase from 'firebase';
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
      name: this.item.name,
      email: this.item.email,
    }
    this.firebaseService.updateTask(this.item.id,data)
    .then(
      res => {
        this.router.navigate(["/home-student"]);
        toast.present();
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

  tasknotification(seconds: number){
    this.localNotifications.schedule([{
      title: `E-log`,
      text: `Task Updated Successfully`,
      trigger: {
        // at: new Date(new Date().getTime() + seconds)
        in: seconds,
        unit: ELocalNotificationTriggerUnit.SECOND},     
    }]);

  }

}