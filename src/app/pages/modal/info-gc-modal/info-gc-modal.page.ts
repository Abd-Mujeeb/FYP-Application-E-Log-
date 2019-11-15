import { Component, OnInit } from '@angular/core';
import { NavParams, ToastController, AlertController, ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/services/user/admin.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GcService } from 'src/app/services/user/gc.service';

@Component({
  selector: 'app-info-gc-modal',
  templateUrl: './info-gc-modal.page.html',
  styleUrls: ['./info-gc-modal.page.scss'],
})
export class InfoGcModalPage implements OnInit {

  record: any;
  item: any;
  public adminlist: any[];
  public loadedadminlist: any[];
  private oldPasswordDatabase: any;
  private oldEmailDatabase: any;
  public userInformation: any;
  public editprofile_form: FormGroup;
  private sub: any;

  schoolkeys: any;
  sictkeys: any;
  sbskeys: any;
  shskeys: any;
  ssekeys: any;

  zone1: any;
  zone2: any;
  zone3: any;
  zone4: any;

  constructor(
    private navParams: NavParams,
    private GcService: GcService,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    ) {

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
          Validators.compose([Validators.required,  Validators.pattern("[78][0-9]{6}")]),
        ],

        school_dept: ['',Validators.required,],
        group_code: ['', Validators.required]
      });

      
    this.schoolkeys = [
      'SICT',
      'SBS',
      'SHS',
      'SSE',
    ]

    this.zone1 = {
      kind: 'NWS06'
    }

    this.sictkeys = [
      'NWS06',
      'NWS07',
      'WBD',
      'INS',
      'DME',    
    ]

    this.zone2 = {
      kind: 'MKT01'
    }
    this.sbskeys = [
      'MKT01',
      'ACC02',
    ]

    this.zone3 = {
      kind: 'Nursing'
    }

    this.shskeys = [
      'Nursing',
      'Paramedic',
    ]

    this.zone4 = {
      kind: 'Civil'
    }
    this.ssekeys = [
      'Petroleum',
      'Civil',
    ]

  


      this.GcService
      .getUserProfileGc()
      .get()
      .then(userInformationSnapshot => {
        this.oldPasswordDatabase = userInformationSnapshot.data().password;
        
      })
  
      this.GcService
      .getUserProfileGc()
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
      displayName: new FormControl(this.item.name, Validators.required),
      email: new FormControl(this.item.email, Validators.email),
      contact_no: new FormControl(this.item.contact_no, Validators.required),
      school_dept: new FormControl(this.item.school_dept, Validators.required),
      group_code: new FormControl(this.item.group_code, Validators.required),
      
    });


    this.GcService
    .getUserProfileGc()
    .get()
    .then(userInformationSnapshot => {
      this.userInformation = userInformationSnapshot.data();
      
    })

  }


  async onSubmit(value){
    const toast = await this.toastCtrl.create({
      message: 'Update successfully',
      duration: 3000
    });

    this.GcService.updateProfile(this.item.id, value)
    .then(
      res => {
        this.modalController.dismiss();
        this.router.navigate(["/info-gc"]);
        toast.present();
      }
    )
  }

async presentAlertConfirm(item){
    const alert = await this.alertCtrl.create({
      subHeader: "Are you sure to delete this account?",
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
          text: 'Delete',
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
               this.GcService.delete_specific_gc( data.email, data.password , item );
               this.modalController.dismiss();
             
             
            }
          }
        }
      ]
    })
    await alert.present()
   
    
  }
  close() {
    this.modalController.dismiss();
  }
}
