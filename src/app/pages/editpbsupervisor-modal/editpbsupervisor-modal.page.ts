import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { PbsupervisorService } from 'src/app/services/user/pbsupervisor.service';

@Component({
  selector: 'app-editpbsupervisor-modal',
  templateUrl: './editpbsupervisor-modal.page.html',
  styleUrls: ['./editpbsupervisor-modal.page.scss'],
})
export class EditpbsupervisorModalPage implements OnInit {
  userProfile: any;
  name: any;
  email: any;
  school_dept: any;
  contact_no: any;

  constructor(
    private navParams: NavParams,
    private pbsupervisorService: PbsupervisorService,
    private alertCtrl: AlertController,
    private modalController: ModalController) { }

  ngOnInit() {
    
    this.name = this.navParams.get('name');
    this.email = this.navParams.get('email');
    this.school_dept = this.navParams.get('school_dept');
    this.contact_no = this.navParams.get('contact_no');
    
  }
  EditRecord(record) {
    record.isEdit = true;
    record.Editname = record.name;
    record.Editemail = record.email;
 
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['name'] = this.name;
    record['email'] = this.email;
    this.pbsupervisorService.update_pbsupervisor(recordRow.id, record);
    recordRow.isEdit = false;
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
            this.pbsupervisorService.delete_pbsupervisor(rowID);
          }
        }
      ]
    });

    await alert.present();
  }


  
 


  close(){
    this.modalController.dismiss();
  }

}
