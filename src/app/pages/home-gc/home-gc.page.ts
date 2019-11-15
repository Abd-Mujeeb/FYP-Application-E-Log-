import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/user/student.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as firebase from 'firebase/app';
import { GcService } from 'src/app/services/user/gc.service';
import { AlertController, NavController, MenuController, LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/user/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { PbStudentlistModalPage } from '../pb-studentlist-modal/pb-studentlist-modal.page';
import { Router } from '@angular/router';
import { GcStudentlistModalPage } from '../gc-studentlist-modal/gc-studentlist-modal.page';
@Component({
  selector: 'app-home-gc',
  templateUrl: './home-gc.page.html',
  styleUrls: ['./home-gc.page.scss'],
})
export class HomeGcPage implements OnInit {

  public userProfile: any[];
  public pw: any;
  public loadeduserProfile: any [];
  public change = false;
  public  changepwForm: FormGroup;
  public currentUser: firebase.User;
  name: string;
  role: string;
  public loading: any;



  constructor(
    private studentService: StudentService,
    private gcService: GcService,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private navCtrl: NavController,
    public menu: MenuController,
    public afs: AngularFirestore,
    public loadingController: LoadingController,
    private modalController: ModalController,
    private router: Router

){}

  ngOnInit() {

    this.gcService
    .getUserProfileGc()
    .get()
    .then( userProfileAdminSnapshot => {
      this.pw = userProfileAdminSnapshot.data()['password'];
      console.log(this.pw)
    });

    if(this.authService.userDetails()){
      this.name = this.authService.userDetails().displayName;
    } else {
      this.navCtrl.navigateBack('');
    }




    this.gcService.read_gcstudent().subscribe(data => {
 
      this.userProfile = data.map(e => {
        return {
       id: e.payload.doc.id,
       isEdit: false,
       name: e.payload.doc.data()['displayName'],
       email: e.payload.doc.data()['email'],
       school_dept: e.payload.doc.data()['school_dept'],
       group_code: e.payload.doc.data()['group_code'],
       student_id: e.payload.doc.data()['student_id'],
       percentage: e.payload.doc.data()['attendance']

     };
      })
      console.log(this.userProfile);
   this.loadeduserProfile = this.userProfile;
  
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .doc(`/users/${user.uid}`)
          .get()
          .then(userProfileSnapshot => {
            this.change = userProfileSnapshot.data().change;
            this.role = userProfileSnapshot.data().role;

          });
      }
    });


  }


  initializeItems(): void {
    this.userProfile = this.loadeduserProfile;
  }

  filterList(evt){
    this.initializeItems();
    const searchTerm = evt.srcElement.value;

    if (!searchTerm){
      return;
    }

    this.userProfile = this.userProfile.filter(currentlist => {
      if (currentlist.name, currentlist.email && searchTerm){
        if (currentlist.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        currentlist.email.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
          return true;
        }
        return false;
      }
    });
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
    this.menu.enable(false);


}

ionViewWillLeave() {
  // Don't forget to return the swipe to normal, otherwise 
  // the rest of the pages won't be able to swipe to open menu
this.menu.swipeEnable(true);
this.menu.enable(true);

  // If you have more than one side menu, use the id like below
  // this.menu.swipeEnable(true, 'menu1');
 }

 openPreview(record){
  this.modalController.create({
    component: GcStudentlistModalPage,
    componentProps: {
      record: record.id,
    }

    
  }).then(modal => modal.present());

}

read_studentattendance(record){
  let recordId = record ? record.id : null;
  this.router.navigate(['/student-attendance', { id: recordId}]);
  console.log(recordId, 'ani step 1 (forward data ID)');

}

    
}
