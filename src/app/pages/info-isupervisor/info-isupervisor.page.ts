import { Component, OnInit } from '@angular/core';
import { IsupervisorService } from 'src/app/services/user/isupervisor.service';

@Component({
  selector: 'app-info-isupervisor',
  templateUrl: './info-isupervisor.page.html',
  styleUrls: ['./info-isupervisor.page.scss'],
})
export class InfoIsupervisorPage implements OnInit {
  userProfile: any;
  public loadeduserProfile: any [];

  constructor( private isupervisorService: IsupervisorService) { }

  ngOnInit() {
    this.isupervisorService.read_isupervisor().subscribe(data => {
 
      this.userProfile = data.map(e => {
           return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['displayName'],
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
    record.Editcompany = record.company;
    record.Editposition = record.position;
  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['name'] = recordRow.Editname;
    record['email'] = recordRow.Editemail;
    record['company'] = recordRow.Editcompany;
    record['position'] = recordRow.Editposition;
    this.isupervisorService.update_isupervisor(recordRow.id, record);
    recordRow.isEdit = false;
  }

  RemoveRecord(rowID) {
    this.isupervisorService.delete_isupervisor(rowID);
  }

}


