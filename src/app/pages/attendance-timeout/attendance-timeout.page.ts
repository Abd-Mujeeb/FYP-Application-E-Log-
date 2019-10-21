import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

declare var google;

@Component({
  selector: 'app-attendance-timeout',
  templateUrl: './attendance-timeout.page.html',
  styleUrls: ['./attendance-timeout.page.scss'],
})
export class AttendanceTimeoutPage implements OnInit {


  @ViewChild('map', {static:true}) mapElement: ElementRef;

  timeoutLatitude: number;
  timeoutLongitude: number;
  map: any;
  address:string;
  validations_form: FormGroup;
  item: any;
  load: boolean = false;
  
  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private firebaseService: FirebaseService,
    public router: Router,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.loadMap();
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
      geoLatitude: new FormControl(this.item.geoLatitude),
      address: new FormControl('', Validators.required),
      timeoutLatitude: new FormControl('', Validators.required),
      timeoutLongitude: new FormControl('', Validators.required),      
    });
  }
   
  async onSubmit(value){
    const toast = await this.toastCtrl.create({
      message: 'Time Out successfully',
      duration: 3000
    });

    this.firebaseService.updateAttendance(this.item.id, value)
    .then(
      res => {
        this.router.navigate(["/attendance-details"]);
        toast.present();
      }
    )
  }
  

  async delete() {
 
    const alertdeleted = await this.alertCtrl.create({
      header: '',
      message: 'Attendance Details Deleted Successfully',
      buttons: ['OK']
    });
    const alert = await this.alertCtrl.create({
      header: 'Confirm',
      message: 'Do you want to delete this attendance?',
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




  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.timeoutLatitude = resp.coords.latitude;
      this.timeoutLongitude = resp.coords.longitude;
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.addListener('tilesloaded', () => {
        console.log('accuracy',this.map);
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())

     
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords "+lattitude+" "+longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.address = "";
        
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if(value.length>0)
          responseAddress.push(value);

        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value+", ";
          
          
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) =>{ 
        this.address = "Address Not Available!";
        
      });

  }


}
