import { Component, OnInit } from '@angular/core';
import { IsupervisorService } from 'src/app/services/user/isupervisor.service';

@Component({
  selector: 'app-info-isupervisor',
  templateUrl: './info-isupervisor.page.html',
  styleUrls: ['./info-isupervisor.page.scss'],
})
export class InfoIsupervisorPage implements OnInit {
  userProfile: any;

  constructor( private isupervisorService: IsupervisorService) { }

  ngOnInit() {
    this.isupervisorService.read_isupervisor().subscribe(data => {
 
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
    this.isupervisorService.update_isupervisor(recordRow.id, record);
    recordRow.isEdit = false;
  }

  RemoveRecord(rowID) {
    this.isupervisorService.delete_isupervisor(rowID);
  }

}


