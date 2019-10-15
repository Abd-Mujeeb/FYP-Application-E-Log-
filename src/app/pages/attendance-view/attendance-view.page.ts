import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-attendance-view',
  templateUrl: './attendance-view.page.html',
  styleUrls: ['./attendance-view.page.scss'],
})
export class AttendanceViewPage implements OnInit {

  
  validations_form: FormGroup;
  image: any;
  item: any;
  load: boolean = false;
  
  constructor(
   
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private router: Router,
  
  ) { }

  ngOnInit() {
    this.getData();
  }
  getData(){
    this.route.data.subscribe(routeData => {
     let data = routeData['data'];
     if (data) {
       this.item = data;
     }
    })
    this.validations_form = this.formBuilder.group({
      address: new FormControl(this.item.address, Validators.required),
      geoLatitude: new FormControl(this.item.geoLatitude, Validators.required),
      geoLongitude: new FormControl(this.item.geoLongitude, Validators.required),
      timeinpicker: new FormControl(this.item.timeinpicker, Validators.required),
      timeoutpicker: new FormControl(this.item.timeoutpicker, Validators.required),

      
    });
  }



  async delete() {
 
    const alertdeleted = await this.alertCtrl.create({
      header: '',
      message: 'Attendance Details Deleted Successfully',
      buttons: ['OK']
    });
    const alert = await this.alertCtrl.create({
      header: 'Confirm',
      message: 'Do you want to delete ' + this.item.address + '?',
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
            this.firebaseService.deleteAttendance(this.item.id)
            .then(
              res => {
                alertdeleted.present();
                this.router.navigate(["/attendance-details"]);
              },
              err => console.log(err)
            )
          }
        }
      ]
    });
    await alert.present();
  }




}

