import { Component, OnInit } from '@angular/core';
import { PbsupervisorService } from 'src/app/services/user/pbsupervisor.service';

@Component({
  selector: 'app-info-pbsupervisor',
  templateUrl: './info-pbsupervisor.page.html',
  styleUrls: ['./info-pbsupervisor.page.scss'],
})
export class InfoPbsupervisorPage implements OnInit {
  userProfile: any;
  public loadeduserProfile: any [];

  constructor(
    private pbsupervisorService: PbsupervisorService,
  ) { }

  ngOnInit() {
    this.pbsupervisorService.read_pbsupervisor().subscribe(data => {
 
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
    this.pbsupervisorService.update_pbsupervisor(recordRow.id, record);
    recordRow.isEdit = false;
  }

  RemoveRecord(rowID) {
    this.pbsupervisorService.delete_pbsupervisor(rowID);
  }

}
