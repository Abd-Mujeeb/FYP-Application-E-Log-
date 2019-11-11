import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/user/student.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as firebase from 'firebase/app';
import { GcService } from 'src/app/services/user/gc.service';
import { AlertController, NavController, MenuController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/user/auth.service';

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
  name: string;
  role: string;
  public loading: any;
  passwordType: string = 'password';
  passwordShown: boolean = false;
  password_Type: string = 'password';
  password_Shown: boolean = false;

  error_messages = {
    'newpassword': [
      { type: 'required', message: 'Password is required.' },
      { type: 'pattern', message: 'Password need to have at least one of Lowercase, Uppercase, Numbers, and Special characters(!@#$%^&) with the minimum length of 8 characters' },
      { type: 'maxlength', message: 'Password length not more than 30 characters' },
    ],
    'confirmpw': [
      { type: 'required', message: 'Password is required.' },
      { type: 'pattern', message: 'Password need to have at least one of Lowercase, Uppercase, Numbers, and Special characters(!@#$%^&) with the minimum length of 8 characters' },
      { type: 'maxlength', message: 'Password length not more than 30 characters' },
    ],
  }


  constructor(
    private studentService: StudentService,
    private gcService: GcService,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private navCtrl: NavController,
    public menu: MenuController,
    public loadingController: LoadingController

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


    this.gcService.read_gcstudent().subscribe(data => {
 
      this.userProfile = data.map(e => {
        return {
       id: e.payload.doc.id,
       isEdit: false,
       name: e.payload.doc.data()['displayName'],
       email: e.payload.doc.data()['email'],
       school_dept: e.payload.doc.data()['school_dept'],
       group_code: e.payload.doc.data()['group_code'],
       student_id: e.payload.doc.data()['student_id']

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
    await this.gcService.updatePassword(oldPassword, confirmpw)

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

}
