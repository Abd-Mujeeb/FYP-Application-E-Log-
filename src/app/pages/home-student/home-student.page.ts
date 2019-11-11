import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController, NavController, MenuController } from '@ionic/angular';
import { StudentService } from 'src/app/services/user/student.service';
import * as firebase from 'firebase/app';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthService } from 'src/app/services/user/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LocalNotifications, ILocalNotificationActionType } from '@ionic-native/local-notifications/ngx';
import { empty } from 'rxjs';
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
  public change = false;
  public changepwForm: FormGroup;
  splash = true;
  userProfile: firebase.firestore.DocumentData;
  displayName: string;
  notif: false;

  constructor(
    private localNotifications: LocalNotifications,
    public http: Http,
    public afstore: AngularFirestore,
    public studentService: StudentService,
    public authservice: AuthService,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private navCtrl: NavController,
    public menu: MenuController,
     ) { }

  ngOnInit() {
    
   if(this.authService.userDetails()){
    this.displayName = this.authService.userDetails().displayName;
  } else {
    this.navCtrl.navigateBack('');
  }

  if (this.firebaseService.read_task() == null){
    this.localNotifications.schedule([{
      id:1,
      title: `E-Log`,
      text: `You haven't upload any task for today`,
      trigger: { every: { hour: 8, minute: 0}, count: 1},
    }])  
    console.log('mau');

  } else{

  }


  
    this.changepwForm = this.formBuilder.group({
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      newpassword: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      confirmpw: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });


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

    // this.studentService
    //   .getUserProfileStudent()
    //   .get()
    //   .then(userProfileStudentSnapshot => {
    //     this.userProfile = userProfileStudentSnapshot.data();
    //   });

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          firebase
          .firestore()
          .doc(`/users/${user.uid}`)
          .get()
          .then(userProfileSnapshot => {
            this.notif = userProfileSnapshot.data().notif;
          })
        }
      })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .doc(`/users/${user.uid}`)
          .get()
          .then(userProfileSnapshot => {
            this.change = userProfileSnapshot.data().change;

          });
      }
      
    });

    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     firebase
    //       .firestore()
    //       .doc(`/users/${user.uid}`)
    //       .get()
    //       .then(userProfileSnapshot => {
    //         this.notif = userProfileSnapshot.data().notif;

    //       });
    //   }

      
    // });


  }

async updatePassword(): Promise<void> {
  const oldPassword = this.changepwForm.value.password;
  const newPassword = this.changepwForm.value.newpassword;
  const confirmpw = this.changepwForm.value.confirmpw;

  if(newPassword == confirmpw){
    this.studentService.updatePassword(oldPassword, newPassword)
    return this.ngOnInit();
  }else{
    return this.alert();
  }

  
}

testNotif(){

  if (!this.firebaseService.read_task() == true){
    this.localNotifications.schedule([{
      id:1,
      title: `E-Log`,
      text: `You haven't upload any task for today`,
      trigger: { every: { hour: 8, minute: 0}, count: 1},
    }])  
    console.log('mau');

  } else{

  }
}


async alert() {
  const alert = await this.alertCtrl.create({
    header: 'Error',
    message: 'New password and confirm password does not match',
    buttons: [
      {
        text: 'Okay',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('go back to change password');

        }
      },
    ]
  });

  await alert.present();
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

  filterList(evt) {
    this.initializeItems();
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.itemslist = this.itemslist.filter(currentitems => {
      if (currentitems.title, currentitems.description && searchTerm) {
        if (currentitems.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
          currentitems.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  Studentlogout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }


}
