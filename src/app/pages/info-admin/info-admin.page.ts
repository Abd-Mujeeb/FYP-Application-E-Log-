import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/user/profile.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AdminService } from 'src/app/services/user/admin.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-info-admin',
  templateUrl: './info-admin.page.html',
  styleUrls: ['./info-admin.page.scss'],
})
export class InfoAdminPage implements OnInit {
  public userProfile: any;
  public birthDate: Date;

  constructor(
    private alertCtrl: AlertController,
    private adminService: AdminService,
    private profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit() {
     this.adminService.read_Admin().subscribe(data => {
 
      this.userProfile = data.map(e => {
           return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          email: e.payload.doc.data()['email'],
        };
      })
      console.log(this.userProfile);
 
    });
    
  }



  EditRecord(record) {
    record.isEdit = true;
    record.EditfirstName = record.firstName;
    record.EditlastName = record.lastName;
    record.Editemail = record.email;
  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['firstName'] = recordRow.EditfirstName;
    record['lastName'] = recordRow.EditlastName;
    record['email'] = recordRow.Editemail;
    this.profileService.update_Admin(recordRow.id, record);
    recordRow.isEdit = false;
  }


  



}