import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  passwordType: string = 'password';
  passwordShown: boolean = false;
  password_Type: string = 'password';
  password_Shown: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private navCtrl: NavController,
    public menu: MenuController,
    public loadingController: LoadingController
    ) { }

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
  ngOnInit() {

    if(this.authService.userDetails()){
      this.name = this.authService.userDetails().displayName;
    } else {
      this.navCtrl.navigateBack('');
    }

    this.adminService
    .getUserProfileAdmin()
    .get()
    .then( userProfileAdminSnapshot => {
      this.userProfile = userProfileAdminSnapshot.data()['password'];
      console.log(this.userProfile)
    });


    this.changepwForm = this.formBuilder.group({
      newpassword: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      confirmpw: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
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

  async updatePassword(): Promise<void> {
    const oldPassword = this.userProfile;
    const newPassword = this.changepwForm.value.newpassword;
    const confirmpw = this.changepwForm.value.confirmpw;

    if(newPassword == confirmpw){
      try{
    await this.adminService.updatePassword(oldPassword, confirmpw)

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
