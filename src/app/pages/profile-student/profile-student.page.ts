import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';
import { ProfileService } from '../../services/user/profile.service';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/user/student.service';
import * as firebase from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.page.html',
  styleUrls: ['./profile-student.page.scss'],
})
export class ProfileStudentPage implements OnInit {
  public userProfile: any;
  no: number;
 contact: boolean = false;
 public signupForm: FormGroup;
 error_messages = {
  'contact_no': [
    { type: 'required', message: 'This is required' },
    { type: 'pattern', message: 'Invalid phone number' },
  ]
}
  
  constructor(
    private alertCtrl: AlertController,
    private authService: AuthService,
    private studentService: StudentService,
    private router: Router,
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
  ) {}

  ngOnInit() {

    this.signupForm = this.formBuilder.group({
  
      contact_no: [
        '',
        Validators.compose([ 
          Validators.required,
          Validators.pattern("[78][0-9]{6}"),
      ]),

    ],

    });



     this.studentService
    .getUserProfileStudent()
    .get()
    .then( userProfileStudentSnapshot => {
      this.userProfile = userProfileStudentSnapshot.data();
      this.no = userProfileStudentSnapshot.data()['contact_no'];
    });

  
  }

  
  contacts(){
   this.contact = true;
  }

  contactss(){
    this.contact = false;
   }

  async update(): Promise<void> {
     const telno = this.signupForm.value.contact_no;

    await this.studentService.updatecontact(telno);
    return   this.loadingController.create({
            message: 'Please wait..',
            duration: 2000,
            spinner: 'bubbles'
          }).then((res) => {
            res.present();
        
            res.onDidDismiss().then(async(dis) => {
              console.log('Loading dismissed! after 2 Seconds');
              const alert = await this.alertCtrl.create({
                header: 'Notification',
                message: 'Your contact number has successfully saved',
                buttons: [
                  {
                    text: 'Okay',
                    cssClass: 'secondary',
                    handler: () => {
                      this.contact = false;
                      return this.ngOnInit();
                    }
                  },
                ]
              });
          
              await alert.present();
             
              
            });
   });
  }

  logOut(): void {
    this.authService.logoutUser().then( () => {
      this.router.navigateByUrl('login');
    });
  }

  EditRecord(record){
    record.isEdit = true;
    record.Editcontact_no = record.contact_no;

  }

  async updateName(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: 'Your Name: ',
      inputs: [
        {
          type: 'text',
          name: 'displayName',
          placeholder: 'Your full name',
          value: this.userProfile.displayName,
        },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.studentService.updateName(data.displayName);
            return this.ngOnInit();
          },
        },
      ],
    });
    await alert.present();
  }

  // updateDOB(birthDate: string): void {
  //   if (birthDate === undefined) {
  //     return;
  //   }
  //   this.studentService.updateDOB(birthDate);
  // }

  async updatePassword(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        { name: 'oldPassword', placeholder: 'Old password', type: 'password' },
        { name: 'newPassword', placeholder: 'New password', type: 'password' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.studentService.updatePassword(
              data.oldPassword,
              data.newPassword
            );
          },
        },
      ],
    });
    await alert.present();
  }

}
