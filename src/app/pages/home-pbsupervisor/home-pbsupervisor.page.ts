import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import { PbsupervisorService } from 'src/app/services/user/pbsupervisor.service';

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
  constructor(private formBuilder: FormBuilder,
    private pbsupervisorService: PbsupervisorService) { }

  ngOnInit() {

    
    this.changepwForm = this.formBuilder.group({
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      newpassword: [
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
        };
      })
      console.log(this.userProfile);
      this.loadeduserProfile = this.userProfile;
  
    });





  }



  async updatePassword(): Promise<void> {
    const newPassword = this.changepwForm.value.password;
    const oldPassword = this.changepwForm.value.newpassword;
    this.pbsupervisorService.updatePassword(oldPassword, newPassword)
    return this.ngOnInit();
      

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

}
