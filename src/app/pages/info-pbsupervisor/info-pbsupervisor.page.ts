import { Component, OnInit, Query } from '@angular/core';
import { PbsupervisorService } from 'src/app/services/user/pbsupervisor.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import * as firebase from 'firebase';

@Component({
  selector: 'app-info-pbsupervisor',
  templateUrl: './info-pbsupervisor.page.html',
  styleUrls: ['./info-pbsupervisor.page.scss'],
})
export class InfoPbsupervisorPage implements OnInit {
  userProfile: any;
  public loadeduserProfile: any [];
  student: any;

  public buttonClicked: boolean = false; //Whatever you want to initialise it as
  gc: any;
  studentId: any;
  user: any;
 public onButtonClick() {

    this.buttonClicked = !this.buttonClicked;
    this.firestore.collection('users/{userId}/student').valueChanges();
}

  constructor(
    private pbsupervisorService: PbsupervisorService,
    private firestore: AngularFirestore,
    private router: Router,
  ) { }

  ngOnInit() {
    this.pbsupervisorService.read_pbsupervisor().subscribe(data => {
 
      this.userProfile = data.map(e => {
           return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['displayName'],
          email: e.payload.doc.data()['email'],
          school_dept: e.payload.doc.data()['school_dept'],
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
    record.Editschool_dept = record.school_dept;
  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['name'] = recordRow.Editname;
    record['email'] = recordRow.Editemail;
    record['school_dept'] = recordRow.Editschool_dept;
    this.pbsupervisorService.update_pbsupervisor(recordRow.id, record);
    recordRow.isEdit = false;
  }

  RemoveRecord(rowID) {
    this.pbsupervisorService.delete_pbsupervisor(rowID);
  }


  button(){

   
  
}


  
 

  
   
}
