import { Component, OnInit, Query } from '@angular/core';
import { PbsupervisorService } from 'src/app/services/user/pbsupervisor.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import * as firebase from 'firebase';
import { AlertController, NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/user/auth.service';
import { EditpbsupervisorModalPage } from '../editpbsupervisor-modal/editpbsupervisor-modal.page';

@Component({
  selector: 'app-info-pbsupervisor',
  templateUrl: './info-pbsupervisor.page.html',
  styleUrls: ['./info-pbsupervisor.page.scss'],
})
export class InfoPbsupervisorPage implements OnInit {
  userProfile: any;
  public loadeduserProfile: any [];
  student: any;

  displayName: string;
  school_dept: string;
  contact_no: number;
  email: string;

  gc: any;
  studentId: any;
  user: any;
  public all: boolean = false;
  public buttonClicked: boolean = false; //Whatever you want to initialise it as
 
 public onButtonClick() {

    this.buttonClicked = !this.buttonClicked;
}


  constructor(
    private pbsupervisorService: PbsupervisorService,
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    private router: Router,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private modalController: ModalController,
  ) {}

   
   filterByschool_dept(school_dept: string|null) {
    if(school_dept == 'All'){
      this.all = false;
      return this.ngOnInit();
 }else{
  this.firestore.collection('users', ref => ref.where('role', '==', 'pbsupervisor').where('school_dept', '==', school_dept)).snapshotChanges().subscribe(data => {
 
    school_dept = data['school_dept']
    this.userProfile = data.map(e => {
         return {
          id: e.payload.doc.id,
          isEdit: false,
          displayName: e.payload.doc.data()['displayName'],
          email: e.payload.doc.data()['email'],
          school_dept: e.payload.doc.data()['school_dept'],
          contact_no: e.payload.doc.data()['contact_no'],
  
  
      };
    })
    console.log(this.userProfile);
  this.loadeduserProfile = this.userProfile;
  this.all = true;
  
  });
}


  }

  filterByNameAscending() {

  this.firestore.collection('users', ref => ref.where('role', '==', 'pbsupervisor').orderBy('displayName', 'asc')).snapshotChanges().subscribe(data => {
    this.userProfile = data.map(e => {
         return {
          id: e.payload.doc.id,
          isEdit: false,
          displayName: e.payload.doc.data()['displayName'],
          email: e.payload.doc.data()['email'],
          school_dept: e.payload.doc.data()['school_dept'],
          contact_no: e.payload.doc.data()['contact_no'],
  
  
      };
    })
    console.log(this.userProfile);
  this.loadeduserProfile = this.userProfile;
  this.all = true;
  
  });
}

filterByNameDescending() {

  this.firestore.collection('users', ref => ref.where('role', '==', 'pbsupervisor').orderBy('displayName', 'desc')).snapshotChanges().subscribe(data => {
    this.userProfile = data.map(e => {
         return {
          id: e.payload.doc.id,
          isEdit: false,
          displayName: e.payload.doc.data()['displayName'],
          email: e.payload.doc.data()['email'],
          school_dept: e.payload.doc.data()['school_dept'],
          contact_no: e.payload.doc.data()['contact_no'],
  
  
      };
    })
    console.log(this.userProfile);
  this.loadeduserProfile = this.userProfile;
  this.all = true;
  
  });
}


  

  ngOnInit() {

    if(this.authService.userDetails()){
      this.displayName = this.authService.userDetails().displayName;
    } else {
      this.navCtrl.navigateBack('');
    }


    this.pbsupervisorService.read_pbsupervisor().subscribe(data => {
 
      this.userProfile = data.map(e => {
           return {
          id: e.payload.doc.id,
          isEdit: false,
          displayName: e.payload.doc.data()['displayName'],
          email: e.payload.doc.data()['email'],
          school_dept: e.payload.doc.data()['school_dept'],
          contact_no: e.payload.doc.data()['contact_no'],
        };
      })
      console.log(this.userProfile);
      this.loadeduserProfile = this.userProfile;
  
    });
  }


  
  openPreview(record){
    this.modalController.create({
      component: EditpbsupervisorModalPage,
      componentProps: {
        record: record,
      }
    }).then(modal => modal.present());
 
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
    record.Editcontact_no = record.contact_no;
  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['displayName'] = recordRow.EditdisplayName;
    record['email'] = recordRow.Editemail;
    record['school_dept'] = recordRow.Editschool_dept;
    record['contact_no'] = recordRow.Editcontact_no;
    this.pbsupervisorService.update_pbsupervisor(recordRow.id, record);
    recordRow.isEdit = false;
  }

  RemoveRecord(rowID) {
    this.pbsupervisorService.delete_pbsupervisor(rowID);
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


  
 

  
   
}
