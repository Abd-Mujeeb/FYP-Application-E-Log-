import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

declare var google;
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {

  
  @ViewChild('map', {static:true}) mapElement: ElementRef;
  map: any;
  address:string;
  timeinpicker: any;
  timeoutpicker: any;


  validations_form: FormGroup;
  
  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private firebaseService: FirebaseService,
    public router: Router,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {
    this.loadMap();
    this.resetFields();
  }

  resetFields(){
     this.validations_form = this.formBuilder.group({
       address: new FormControl('', Validators.required),
       timeinpicker: new FormControl('', Validators.required),
       timeoutpicker: new FormControl('',Validators.required),
     });
   }

   
  async onSubmit(value){
    const toast = await this.toastCtrl.create({
      message: 'Attendance created successfully',
      duration: 3000
    });
    let currentUser = firebase.auth().currentUser;
    let data = {
      address: value.address,
      timeinpicker: value.timeinpicker,
      timeoutpicker: value.timeoutpicker,
      name: currentUser.uid,
      email: currentUser.email,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }
    this.firebaseService.createAttendance(data)
    .then(
      res => {
        this.router.navigate(["/attendance-details"]);
        toast.present();
      }
    )
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
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
