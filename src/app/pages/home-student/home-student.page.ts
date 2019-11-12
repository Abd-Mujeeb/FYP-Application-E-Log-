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
  public userProfile: any;
  public pw: any;
  public changepwForm: FormGroup;
  splash = true;
  name: string;
  public loading: any;
  passwordType: string = 'password';
  passwordShown: boolean = false;
  password_Type: string = 'password';
  password_Shown: boolean = false;

  error_messages = {
    'newpassword': [
      { type: 'required', message: 'Password is required.' },
      { type: 'pattern', message: 'Must contain at least one upercase, lowercase, number and speacial characters(!@#$%^&)' },
      { type: 'maxlength', message: 'Password length not more than 30 characters' },
    ],
    'confirmpw': [
      { type: 'required', message: 'Password is required.' },
      { type: 'pattern', message: 'Must contain at least one upercase, lowercase, number and speacial characters(!@#$%^&)' },
      { type: 'maxlength', message: 'Password length not more than 30 characters' },
    ],
  }


  constructor(
    private localNotifications: LocalNotifications,
    public http: Http,
    public afstore: AngularFirestore,
    public studentService: StudentService,
    public authservice: AuthService,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    public loadingController: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private navCtrl: NavController,
    public menu: MenuController,
     ) { }

  ngOnInit() {


    
   if(this.authService.userDetails()){
    this.name = this.authService.userDetails().displayName;
  } else {
    this.navCtrl.navigateBack('');
  }

  this.studentService
  .getUserProfileStudent()
  .get()
  .then( userProfilestudentSnapshot => {
    this.pw = userProfilestudentSnapshot.data()['password'];
    console.log(this.pw)
  });

  
  this.changepwForm = this.formBuilder.group({
    newpassword: [
      '',
      Validators.compose([ 
        Validators.required, 
        Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}"),
        Validators.maxLength(30)]),
    ],
    confirmpw: [
      '',
      Validators.compose([ 
        Validators.required, 
        Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}"),
        Validators.maxLength(30)]),
    ],
  },
  { 
    validators: this.password.bind(this)
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

    this.studentService
      .getUserProfileStudent()
      .get()
      .then(userProfileStudentSnapshot => {
        this.userProfile = userProfileStudentSnapshot.data();
      });

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

  public togglePassword(){
    if(this.passwordShown){
      this.passwordShown = false;
      this.passwordType = 'password';
    }else{
      this.passwordShown = true;
      this.passwordType = 'text';
    }
  }

  public toggle_Password(){
    if(this.password_Shown){
      this.password_Shown = false;
      this.password_Type = 'password';
    }else{
      this.password_Shown = true;
      this.password_Type = 'text';
    }
  }
  
  password(formGroup: FormGroup) {
    const { value: newpassword } = formGroup.get('newpassword');
    const { value: confirmpw } = formGroup.get('confirmpw');
    return newpassword === confirmpw ? null : { passwordNotMatch: true };
  }

  async updatePassword(): Promise<void> {
    const oldPassword = this.pw;
    const newPassword = this.changepwForm.value.newpassword;
    const confirmpw = this.changepwForm.value.confirmpw;

 if (newPassword == confirmpw){
      try{
    await this.studentService.updatePassword(oldPassword, confirmpw)

  }catch{
   console.log('catch')
  }
  await this.loadingController.create({
    message: 'Please wait..',
    duration: 3000,
    spinner: 'bubbles'
  }).then((res) => {
    res.present();

    res.onDidDismiss().then(async(dis) => {
      console.log('Loading dismissed! after 3 Seconds');
      const alert = await this.alertCtrl.create({
        header: 'Notification',
        message: 'Your Password has successfully changed',
        buttons: [
          {
            text: 'Okay',
            cssClass: 'secondary'
          },
        ]
      });
  
      await alert.present();
     
      
    });
    
  });

  this.change = false;
    }else{
      return this.alert();
    }
  
    
  }

// testNotif(){

//   let currentUser = firebase.auth().currentUser;

//   var notif = this.afs.collection('users').doc(currentUser.uid).collection('tasks').snapshotChanges();
//          if (!notif == true) {
//           this.localNotifications.schedule([{
//             id:1,
//             title: `E-Log`,
//             text: `You haven't upload any task for today`,
//             trigger: { every: { hour: 8, minute: 0}, count: 1}
//           }])
//           return this.ngOnInit();
//         }
// }


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
