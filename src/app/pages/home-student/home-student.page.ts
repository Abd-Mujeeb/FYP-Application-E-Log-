import { Component, OnInit } from '@angular/core';
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
  selector: 'app-home-student',
  templateUrl: './home-student.page.html',
  styleUrls: ['./home-student.page.scss'],
})
export class HomeStudentPage implements OnInit {

  items: Array<any>;
  loaded: any[];
 

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

async getData(){
  const loading = await this.loadingCtrl.create({
    message: 'Please wait...'
  });
  this.presentLoading(loading);

  this.route.data.subscribe(routeData => {
    routeData['data'].subscribe(data => {

      loading.dismiss();
      this.items = data;
      this.loaded = this.items;
    })
  })
}

async presentLoading(loading) {
  return await loading.present();
}

initializeItems(): void {
  this.items = this.loaded;
}

filterList(evt){
  this.initializeItems();
  const searchTerm = evt.srcElement.value;

  if (!searchTerm){
    return;
  }

  this.items = this.items.filter(currentlist => {
    if (currentlist.created, currentlist.title, currentlist.description  && searchTerm){
      if (currentlist.created.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
      currentlist.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
        return true;
      }
      return false;
    }
  });
}

}
