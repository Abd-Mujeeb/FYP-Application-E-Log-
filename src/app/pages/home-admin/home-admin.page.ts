import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import { AdminService } from 'src/app/services/user/admin.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {
  public change = false;
  public  changepwForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private adminService: AdminService) { }

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
    const oldPassword = this.changepwForm.value.password;
    const newPassword = this.changepwForm.value.newpassword;
    this.adminService.updatePassword(oldPassword, newPassword)
    return this.ngOnInit();
      

  
  }



}
