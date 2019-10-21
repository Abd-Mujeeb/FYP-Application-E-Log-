import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/user/student.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as firebase from 'firebase/app';
import { GcService } from 'src/app/services/user/gc.service';

@Component({
  selector: 'app-home-gc',
  templateUrl: './home-gc.page.html',
  styleUrls: ['./home-gc.page.scss'],
})
export class HomeGcPage implements OnInit {

  public userProfile: any[];
  public loadeduserProfile: any [];
  public change = false;
  public  changepwForm: FormGroup;

  constructor(
    private studentService: StudentService,
    private gcService: GcService,
    private formBuilder: FormBuilder){}

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


    this.studentService.read_student().subscribe(data => {
 
      this.userProfile = data.map(e => {
           return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
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

          });
      }
    });


  }

  async updatePassword(): Promise<void> {
    const oldPassword = this.changepwForm.value.password;
    const newPassword = this.changepwForm.value.newpassword;
    this.gcService.updatePassword(oldPassword, newPassword)
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
