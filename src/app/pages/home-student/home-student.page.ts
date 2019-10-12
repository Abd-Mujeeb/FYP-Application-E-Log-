import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { StudentService } from 'src/app/services/user/student.service';
import * as firebase from 'firebase/app';
import { FirebaseService } from 'src/app/services/firebase.service';
// export interface Image {
//   id: string;
//   image: string;
// }
@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.page.html',
  styleUrls: ['./home-student.page.scss'],
})
export class HomeStudentPage implements OnInit {

  // items: Array<any>;
  public itemslist: any[];
  public loadeditems: any[];
 

  constructor(   
   public http: Http,
   public afstore: AngularFirestore,
   public studentService: StudentService,
   private route: ActivatedRoute,
   private firebaseService: FirebaseService,
   public loadingCtrl: LoadingController,) { }

  ngOnInit() {
    // if (this.route && this.route.data) {
    //   this.getData();
    this.firebaseService.read_task().subscribe(data => {
      this.itemslist = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          title: e.payload.doc.data()['title'],
          pickdate: e.payload.doc.data()['pickdate'],
          image: e.payload.doc.data()['image'],
          description: e.payload.doc.data()['description'],
        };
      })
      console.log(this.itemslist);
      this.loadeditems = this.itemslist;
    });
    



   
  }



// async getData(){
//   const loading = await this.loadingCtrl.create({
//     message: 'Please wait...'
//   });
//   this.presentLoading(loading);

//   this.route.data.subscribe(routeData => {
//     routeData['data'].subscribe(data => {

//       this.items = data;
//       this.loaded = data;
//       loading.dismiss();
//       // this.items = data;
      
//     })
//   })
// }



async presentLoading(loading) {
  return await loading.present();
}

initializeItems(): void {
  this.itemslist = this.loadeditems;
}

filterList(evt){
  this.initializeItems();
  const searchTerm = evt.srcElement.value;

  if (!searchTerm){
    return;
  }

  this.itemslist = this.itemslist.filter(currentitems => {
    if (currentitems.title, currentitems.description  && searchTerm) {
      if (currentitems.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
      currentitems.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
        return true;
      }
      return false;
    }
  });
}

}
