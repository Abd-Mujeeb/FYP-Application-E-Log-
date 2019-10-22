import { Component, OnInit } from '@angular/core';
import { GcService } from 'src/app/services/user/gc.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-info-gc',
  templateUrl: './info-gc.page.html',
  styleUrls: ['./info-gc.page.scss'],
})
export class InfoGcPage implements OnInit {
  userProfile: any;
  public loadeduserProfile: any [];

  constructor(
    private gcService: GcService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.gcService.read_gc().subscribe(data => {
 
      this.userProfile = data.map(e => {
           return {
          id: e.payload.doc.id,
          isEdit: false,
          displayName: e.payload.doc.data()['displayName'],
          email: e.payload.doc.data()['email'],
          school_dept: e.payload.doc.data()['school_dept'],
          group_code: e.payload.doc.data()['gcgroup_code'],
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
      if (currentlist.displayName, currentlist.email && searchTerm){
        if (currentlist.displayName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
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

}
