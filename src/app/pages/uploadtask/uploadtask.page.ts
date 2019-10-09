import { Component, OnInit} from '@angular/core';
import { Http } from '@angular/http'
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { StudentService } from 'src/app/services/user/student.service';


export interface Image {
  id: string;
  image: string;
}

@Component({
  selector: 'app-uploadtask',
  templateUrl: './uploadtask.page.html',
  styleUrls: ['./uploadtask.page.scss'],
})
export class UploadtaskPage implements OnInit {


 //djabif code
 items: Array<any>;
 
 constructor(

   private afs: AngularFirestore,
   public http: Http,
   public afstore: AngularFirestore,
   public studentService: StudentService,
   private route: ActivatedRoute,
   public loadingCtrl: LoadingController,) { }


 ngOnInit() {
   if (this.route && this.route.data) {
     this.getData();
 }
}


 //djabif

 async getData(){
   const loading = await this.loadingCtrl.create({
     message: 'Please wait...'
   });
   this.presentLoading(loading);

   this.route.data.subscribe(routeData => {
     routeData['data'].subscribe(data => {
       loading.dismiss();
       this.items = data;
     })
   })
 }

 async presentLoading(loading) {
   return await loading.present();
 }
}

