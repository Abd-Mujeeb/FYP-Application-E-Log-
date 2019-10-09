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
  public loadeduserProfile: any [];

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
    record.Editname = record.name;
    record.Editemail = record.email;
  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['name'] = recordRow.Editname;
    record['email'] = recordRow.Editemail;
    this.adminService.update_Admin(recordRow.id, record);
    recordRow.isEdit = false;
  }

  RemoveRecord(rowID) {
    this.adminService.delete_admin(rowID);
  }


  



}