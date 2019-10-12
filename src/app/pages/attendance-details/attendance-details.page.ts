import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LoadingController } from '@ionic/angular';
import { Http } from '@angular/http';

@Component({
  selector: 'app-attendance-details',
  templateUrl: './attendance-details.page.html',
  styleUrls: ['./attendance-details.page.scss'],
})
export class AttendanceDetailsPage implements OnInit {
  public attendancelist: any[];
  public loadedattendance: any[];
 
  constructor(  public http: Http,
    public afstore: AngularFirestore,
    private firebaseService: FirebaseService,
    public loadingCtrl: LoadingController,
    ) { }

  ngOnInit() {
    this.firebaseService.readAttendance().subscribe(data => {
      this.attendancelist = data.map(e => {
        return {
          id: e.payload.doc.id,
          address: e.payload.doc.data()['address'],
          timeinpicker: e.payload.doc.data()['timeinpicker'],
          timeoutpicker: e.payload.doc.data()['timeoutpicker'],
          timestamp: e.payload.doc.data()['timestamp'],
         
        };
      })
      console.log(this.attendancelist);
      
    });
   
  }
  deleteattendance(rowID) {
    this.firebaseService.deleteAttendance(rowID);
  }
  
}
  
    
