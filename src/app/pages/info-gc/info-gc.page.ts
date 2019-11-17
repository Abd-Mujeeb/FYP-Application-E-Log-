import { Component, OnInit } from '@angular/core';
import { GcService } from 'src/app/services/user/gc.service';
import { AlertController, NavController, ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/user/auth.service';
import { InfoGcModalPage } from '../modal/info-gc-modal/info-gc-modal.page';

@Component({
  selector: 'app-info-gc',
  templateUrl: './info-gc.page.html',
  styleUrls: ['./info-gc.page.scss'],
})
export class InfoGcPage implements OnInit {

  userProfile: any;
  public loadeduserProfile: any [];
  public all: boolean = false;
  displayName: string;
  
  constructor(
    private gcService: GcService,
    private alertCtrl: AlertController,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private navCtrl: NavController,
    private modalController: ModalController,
  ) { }

  filterByschool_dept(school_dept: string|null) {
    if(school_dept == 'All'){
      this.all = false;
      return this.ngOnInit();
 }else{
  this.firestore.collection('users', ref => ref.where('role', '==', 'gc').where('school_dept', '==', school_dept)).snapshotChanges().subscribe(data => {
 
    school_dept = data['school_dept']
    this.userProfile = data.map(e => {
         return {
          id: e.payload.doc.id,
          isEdit: false,
          displayName: e.payload.doc.data()['displayName'],
          email: e.payload.doc.data()['email'],
          school_dept: e.payload.doc.data()['school_dept'],
          group_code: e.payload.doc.data()['group_code'],
          contact_no: e.payload.doc.data()['contact_no'],
  
  
      };
    })
    console.log(this.userProfile);
  this.loadeduserProfile = this.userProfile;
  this.all = true;
  
  });
}


  }

  ngOnInit() {

    if(this.authService.userDetails()){
      this.displayName = this.authService.userDetails().displayName;
    } else {
      this.navCtrl.navigateBack('');
    }

    this.gcService.read_gc().subscribe(data => {
 
      this.userProfile = data.map(e => {
           return {
          id: e.payload.doc.id,
          isEdit: false,
          displayName: e.payload.doc.data()['displayName'],
          email: e.payload.doc.data()['email'],
          school_dept: e.payload.doc.data()['school_dept'],
          group_code: e.payload.doc.data()['group_code'],
          contact_no: e.payload.doc.data()['contact_no'],

        };
      })
      console.log(this.userProfile);
      this.loadeduserProfile = this.userProfile;
  
    });
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


  EditRecord(record) {
    record.isEdit = true;
    record.EditdisplayName = record.displayName;
    record.Editemail = record.email;
    record.Editschool_dept = record.school_dept;
    record.Editgroup_code = record.group_code;
  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['displayName'] = recordRow.EditdisplayName;
    record['email'] = recordRow.Editemail;
    record['school_dept'] = recordRow.Editschool_dept;
    record['group_code'] = recordRow.Editgroup_code;
    this.gcService.update_gc(recordRow.id, record);
    recordRow.isEdit = false;
  }

  RemoveRecord(rowID) {
    this.gcService.delete_gc(rowID);
  }

  async presentAlertConfirm(rowID) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Message <strong>Are you sure to remove user? </br>click "confirm" to permanantly delete user</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            console.log('Confirm');
            this.gcService.delete_gc(rowID);
          }
        }
      ]
    });

    await alert.present();
  }

  openPreview(record){
    this.modalController.create({
      component: InfoGcModalPage,
      componentProps: {
        record: record,
      }
 
      
    }).then(modal => modal.present());
 
  }

}
