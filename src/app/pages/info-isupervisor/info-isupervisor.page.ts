import { Component, OnInit } from '@angular/core';
import { IsupervisorService } from 'src/app/services/user/isupervisor.service';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-info-isupervisor',
  templateUrl: './info-isupervisor.page.html',
  styleUrls: ['./info-isupervisor.page.scss'],
})
export class InfoIsupervisorPage implements OnInit {
  userProfile: any;
  public loadeduserProfile: any [];
  displayName: string;

  constructor( 
    private isupervisorService: IsupervisorService,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private navCtrl: NavController,
    ) { }

  ngOnInit() {

    
    if(this.authService.userDetails()){
      this.displayName = this.authService.userDetails().displayName;
    } else {
      this.navCtrl.navigateBack('');
    }



    this.isupervisorService.read_isupervisor().subscribe(data => {
 
      this.userProfile = data.map(e => {
           return {
          id: e.payload.doc.id,
          isEdit: false,
          displayName: e.payload.doc.data()['displayName'],
          email: e.payload.doc.data()['email'],
          company: e.payload.doc.data()['company'],
          position: e.payload.doc.data()['position'],
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
    record.Editcompany = record.company;
    record.Editposition = record.position;
  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['displayName'] = recordRow.EditdisplayName;
    record['email'] = recordRow.Editemail;
    record['company'] = recordRow.Editcompany;
    record['position'] = recordRow.Editposition;
    this.isupervisorService.update_isupervisor(recordRow.id, record);
    recordRow.isEdit = false;
  }

  RemoveRecord(rowID) {
    this.isupervisorService.delete_isupervisor(rowID);
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
            this.isupervisorService.delete_isupervisor(rowID);
          }
        }
      ]
    });

    await alert.present();
  }

}


