import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as firebase from 'firebase/app';
import { AdminService } from 'src/app/services/user/admin.service';
import { AlertController, NavController, MenuController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {
  public change = false;
  public  changepwForm: FormGroup;
  public userProfile: any;
  name: string;
  role: string;
  public loading: any;
 
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private navCtrl: NavController,
    public menu: MenuController,
    public loadingController: LoadingController
    ) { 
    }

  ngOnInit() {

    if(this.authService.userDetails()){
      this.name = this.authService.userDetails().displayName;
    } else {
      this.navCtrl.navigateBack('');
    }

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
