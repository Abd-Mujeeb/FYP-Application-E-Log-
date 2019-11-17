import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/user/student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import { GcService } from 'src/app/services/user/gc.service';
import { AlertController, NavController, MenuController, LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/user/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { PbStudentlistModalPage } from '../pb-studentlist-modal/pb-studentlist-modal.page';
import { Router } from '@angular/router';
import { GcStudentlistModalPage } from '../gc-studentlist-modal/gc-studentlist-modal.page';
import { async } from 'q';
@Component({
  selector: 'app-home-gc',
  templateUrl: './home-gc.page.html',
  styleUrls: ['./home-gc.page.scss'],
})
export class HomeGcPage implements OnInit {

  public userProfile: any[];
  public groupcoordinator: any[];
  public pw: any;
  public loadeduserProfile: any[];
  public change = false;
  public changepwForm: FormGroup;
  public currentUser: firebase.User;
  name: string;
  role: string;
  public loading: any;
  id: any[];
  fail: boolean = false;
  pass: boolean = false;



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

  ) { }


  ngOnInit() {

    this.gcService
      .getUserProfileGc()
      .get()
      .then(userProfileAdminSnapshot => {
        this.pw = userProfileAdminSnapshot.data()['password'];
        console.log(this.pw)
      });

    if (this.authService.userDetails()) {
      this.name = this.authService.userDetails().displayName;
    } else {
      this.navCtrl.navigateBack('');
    }

    this.gcService.read_currentgc().subscribe(data => {
      this.groupcoordinator = data.map(e => {
        return {
          group_code: e.payload.doc.data()['group_code'],
        };
      })
      console.log(this.groupcoordinator);
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


  showstudent(record){
    let recordgroupcode = record ? record.group_code : null;
    this.router.navigate(['/gc-student', { group_code: recordgroupcode}]);
    console.log(recordgroupcode, 'ani step 1 (forward data ID)');
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




}
