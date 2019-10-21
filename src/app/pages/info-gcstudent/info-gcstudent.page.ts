import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/user/student.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { GcService } from 'src/app/services/user/gc.service';

@Component({
  selector: 'app-info-gcstudent',
  templateUrl: './info-gcstudent.page.html',
  styleUrls: ['./info-gcstudent.page.scss'],
})
export class InfoGcstudentPage implements OnInit {
  public userProfile: any[];
  public loadeduserProfile: any [];


  constructor(
    private gcService: GcService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.gcService.read_gcstudent().subscribe(data => {
 
      this.userProfile = data.map(e => {
           return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['displayName'],
          email: e.payload.doc.data()['email'],
          school_dept: e.payload.doc.data()['school_dept'],
          group_code: e.payload.doc.data()['group_code'],
          student_id: e.payload.doc.data()['student_id']

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

  

}
