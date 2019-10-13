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



  }



  async updatePassword(): Promise<void> {
    const newPassword = this.changepwForm.value.password;
    const oldPassword = this.changepwForm.value.newpassword;
    this.pbsupervisorService.updatePassword(oldPassword, newPassword)
    return this.ngOnInit();
      

}

}
