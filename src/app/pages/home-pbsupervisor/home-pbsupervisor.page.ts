import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import { PbsupervisorService } from 'src/app/services/user/pbsupervisor.service';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-home-pbsupervisor',
  templateUrl: './home-pbsupervisor.page.html',
  styleUrls: ['./home-pbsupervisor.page.scss'],
})
export class HomePbsupervisorPage implements OnInit {

  public change = false;
  public  changepwForm: FormGroup;
  userProfile: any;
  public loadeduserProfile: any [];
  displayName: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private pbsupervisorService: PbsupervisorService,
    private alertCtrl: AlertController,
    public menu: MenuController,
    private navCtrl: NavController,
    private authService: AuthService,
    ) { }

  ngOnInit() {

    if(this.authService.userDetails()){
      this.displayName = this.authService.userDetails().displayName;
    } else {
      this.navCtrl.navigateBack('');
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

    this.pbsupervisorService.read_mystudent().subscribe(data => {
 
      this.userProfile = data.map(e => {
           return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['displayName'],
          email: e.payload.doc.data()['email'],
          school_dept: e.payload.doc.data()['school_dept'],
          student: e.payload.doc.data()['student'],
          group_code: e.payload.doc.data()['group_code'],
          isupervisor: e.payload.doc.data()['isupervisor'],
          pbsupervisor: e.payload.doc.data()['pbsupervisor'],
          company: e.payload.doc.data()['company'],
        };
      })
      console.log(this.userProfile);
      this.loadeduserProfile = this.userProfile;
  
    });





  }



  async updatePassword(): Promise<void> {
    const oldPassword = this.changepwForm.value.password;
    const newPassword = this.changepwForm.value.newpassword;
    const confirmpw = this.changepwForm.value.confirmpw;

    if(newPassword == confirmpw){
      this.pbsupervisorService.updatePassword(oldPassword, newPassword)
      return this.ngOnInit();
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
