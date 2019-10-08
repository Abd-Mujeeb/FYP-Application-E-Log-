import { Component, OnInit } from '@angular/core';
import { PbsupervisorService } from 'src/app/services/user/pbsupervisor.service';

@Component({
  selector: 'app-info-pbsupervisor',
  templateUrl: './info-pbsupervisor.page.html',
  styleUrls: ['./info-pbsupervisor.page.scss'],
})
export class InfoPbsupervisorPage implements OnInit {
  userProfile: any;

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
