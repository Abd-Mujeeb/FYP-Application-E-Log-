import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import { IsupervisorService } from 'src/app/services/user/isupervisor.service';

@Component({
  selector: 'app-home-isupervisor',
  templateUrl: './home-isupervisor.page.html',
  styleUrls: ['./home-isupervisor.page.scss'],
})
export class HomeIsupervisorPage implements OnInit {

  public change = false;
  public  changepwForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private isupervisorService: IsupervisorService) { }

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
    this.isupervisorService.updatePassword(oldPassword, newPassword)
    return this.ngOnInit();
      

  
  }
}
