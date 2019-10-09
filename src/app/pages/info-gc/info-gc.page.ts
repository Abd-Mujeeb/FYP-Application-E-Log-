import { Component, OnInit } from '@angular/core';
import { GcService } from 'src/app/services/user/gc.service';

@Component({
  selector: 'app-info-gc',
  templateUrl: './info-gc.page.html',
  styleUrls: ['./info-gc.page.scss'],
})
export class InfoGcPage implements OnInit {
  userProfile: any;

  constructor(
    private gcService: GcService,
  ) { }

  ngOnInit() {
    this.gcService.read_gc().subscribe(data => {
 
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
    this.gcService.update_gc(recordRow.id, record);
    recordRow.isEdit = false;
  }

  RemoveRecord(rowID) {
    this.gcService.delete_gc(rowID);
  }

}
