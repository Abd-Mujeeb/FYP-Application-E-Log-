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


}
