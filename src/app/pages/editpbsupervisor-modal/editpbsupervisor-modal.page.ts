import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, AlertController, ToastController } from '@ionic/angular';
import { PbsupervisorService } from 'src/app/services/user/pbsupervisor.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editpbsupervisor-modal',
  templateUrl: './editpbsupervisor-modal.page.html',
  styleUrls: ['./editpbsupervisor-modal.page.scss'],
})
export class EditpbsupervisorModalPage implements OnInit {

  record: any;
  public pbsupervisorlist: any[];
  public loadedpbsupervisorlist: any[];
  private oldPasswordDatabase: any;
  private oldEmailDatabase: any;
  public userInformation: any;
  public editprofile_form: FormGroup;
  item: any;
  schoolkeys: any;

  constructor(
    private navParams: NavParams,
    private pbsupervisorService: PbsupervisorService,
    private alertCtrl: AlertController,
    private modalController: ModalController,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private router: Router,
    ) 
    { 

      this.editprofile_form = this.formBuilder.group({
        displayName: [
          '',
          Validators.compose([Validators.required, Validators.minLength(5)]),
        ],
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        contact_no: [
          '',
          Validators.compose([Validators.required, Validators.minLength(7), Validators.pattern('[0-7]')]),
        ],
    
        school_department: ['', Validators.required,],
      });
      
       
    this.schoolkeys = [
      'SICT',
      'SBS',
      'SHS',
      'SSE',
    ]


      this.pbsupervisorService
      .getUserProfilePbsupervisor()
      .get()
      .then(userInformationSnapshot => {
        this.oldPasswordDatabase = userInformationSnapshot.data().password;
        
      })
  
      this.pbsupervisorService
      .getUserProfilePbsupervisor()
      .get()
      .then(userInformationSnapshot => {
        this.oldEmailDatabase = userInformationSnapshot.data().email;
        
      })    

    }

    async presentToast(message: string) {
      const toast = await this.toastCtrl.create({
        message: message,
        duration: 2000,
      });
      toast.present();
    }

  ngOnInit() {
    
    this.record = this.navParams.get('record');
    console.log(this.record, 'ani step 2');
    this.item = this.record;
    console.log(this.item, 'ani step 3');

    this.editprofile_form = this.formBuilder.group({
      displayName: new FormControl(this.item.displayName, Validators.required),
      email: new FormControl(this.item.email, Validators.email),
      contact_no: new FormControl(this.item.contact_no, Validators.required),
      school_dept: new FormControl(this.item.school_dept, Validators.required),
      
      
    });
    
    this.pbsupervisorService
    .getUserProfilePbsupervisor()
    .get()
    .then(userInformationSnapshot => {
      this.userInformation = userInformationSnapshot.data();
      
    })

   




    // this.name = this.navParams.get('name');
    // this.email = this.navParams.get('email');
    // this.school_dept = this.navParams.get('school_dept');
    // this.contact_no = this.navParams.get('contact_no');
    
    // this.record = this.navParams.get('record');
    // console.log(this.record, 'ani step 2');

    // let pbsupervisorUID = this.record;
    // console.log(pbsupervisorUID, 'ani step 3');
    // this.pbsupervisorService.read_specific_pbsupervisor(pbsupervisorUID).subscribe(data => {

    //   this.pbsupervisorlist = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       name: e.payload.doc.data()['displayName'],
    //       email: e.payload.doc.data()['email'],
    //       contact_no: e.payload.doc.data()['contact_no'],
    //       school_dept: e.payload.doc.data()['school_dept'],
    //     };
    //   })
    //   console.log(this.pbsupervisorlist);
    //   this.loadedpbsupervisorlist = this.pbsupervisorlist;

    // });




  }



  async onSubmit(value){
    const toast = await this.toastCtrl.create({
      message: 'Update successfully',
      duration: 3000
    });

    this.pbsupervisorService.updateProfile(this.item.id, value)
    .then(
      res => {
        this.modalController.dismiss();
        this.router.navigate(["/info-pbsupervisor"]);
        toast.present();
      }
    )
  }

  async presentAlertConfirm(item){
    const alert = await this.alertCtrl.create({
      subHeader: "Are you sure to remove this account?",
      inputs: [
        {
          type: 'text',
          name: 'email',
          placeholder: 'Enter your email'
        },
        {
          type: 'password',
          name: 'password',
          placeholder: 'Enter your password'
        }
      ],
      buttons:
      [
        {
          text: 'Cancel'
        },
        {
          text: 'Remove',
          handler: data => {
            if((data.email == "" ) && (data.password == "") 
            || (data.email == "") 
            || (data.password == "")) {
              this.presentToast("Enter Both To Confirm The Deletion")
              return false;
            } 
            else if((data.email != this.oldEmailDatabase) && (data.password != this.oldPasswordDatabase)) {
              console.log(data.email, this.oldEmailDatabase, 'email and password');
              this.presentToast("Email and Password is not same")
              return false;
            }
            else if(data.email != this.oldEmailDatabase) {
              console.log(data.email, this.oldEmailDatabase, 'email ');
              this.presentToast("Email is not same")
              return false;
            }
            else if(data.password != this.oldPasswordDatabase) {
              console.log(data.password, this.oldPasswordDatabase, 'password');
              this.presentToast("Password is not same")
              return false;
            }
            else 
            {
              console.log(item, 'what is item?')
               this.pbsupervisorService.delete_specific_pbsupervisor( data.email, data.password , item );
               this.modalController.dismiss();
             
             
            }
          }
        }
      ]
    })
    await alert.present()
   
    
  }

  
 


  close(){
    this.modalController.dismiss();
  }

}
