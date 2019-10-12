import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase/app';

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
  datepicker: any;


  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private firebaseService: FirebaseService,
    public router: Router,
    public toastCtrl: ToastController,
  ) { }

  ngOnInit() {
    this.loadMap();
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


  async submitattendance(){
    const toast = await this.toastCtrl.create({
      message: 'Attendance Updated Successfully',
      duration: 3000
    });
    let dataattendance = {
      address: this.address,
      datepicker: this.datepicker,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    }
    this.firebaseService.createAttendance(dataattendance).then(
      res => {
        this.router.navigate(["/attendance-details"]);
        toast.present();
      }
    )
  }
}
