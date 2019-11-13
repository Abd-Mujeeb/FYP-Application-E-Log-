import { Component, OnInit } from '@angular/core';
import { PbsupervisorService } from 'src/app/services/user/pbsupervisor.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/user/auth.service';
import { Router } from '@angular/router';
import { StudentTaskPage } from '../student-task/student-task.page';
import { PbStudentlistModalPage } from '../pb-studentlist-modal/pb-studentlist-modal.page';

@Component({
  selector: 'app-pb-studentlist',
  templateUrl: './pb-studentlist.page.html',
  styleUrls: ['./pb-studentlist.page.scss'],
})
export class PbStudentlistPage implements OnInit {

  userProfile: any;
  public loadeduserProfile: any [];
  student: any;
  public studenttask: any [];
  name: string;
  school_dept: string;
  contact_no: number;
  email: string;

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
    private navCtrl: NavController,
    private router: Router,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {

    if(this.authService.userDetails()){
      this.name = this.authService.userDetails().displayName;
    } else {
      this.navCtrl.navigateBack('');
    }


    this.pbsupervisorService.read_mystudent().subscribe(data => {
 
      this.userProfile = data.map(e => {
           return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['displayName'],
          email: e.payload.doc.data()['email'],
          company: e.payload.doc.data()['company'],
          group_code: e.payload.doc.data()['group_code'],
          school_dept: e.payload.doc.data()['school_dept'],
          contact_no: e.payload.doc.data()['contact_no'],
          student_id: e.payload.doc.data()['student_id'],
          

        };
      })
      console.log(this.userProfile);
      this.loadeduserProfile = this.userProfile;
  
    });
  }

  openPreview(record){
    this.modalController.create({
      component: PbStudentlistModalPage,
      componentProps: {
        record: record.id,
      }
 
      
    }).then(modal => modal.present());
 
  }

  read_studenttask(record){
    let recordId = record ? record.id : null;
    this.router.navigate(['/student-task', { id: recordId}]);
    console.log(recordId, 'ani step 1 (forward data ID)');
  }

  read_studentattendance(record){
    let recordId = record ? record.id : null;
    this.router.navigate(['/student-attendance', { id: recordId}]);
    console.log(recordId, 'ani step 1 (forward data ID)');

  }
  getstudenttask(record) {
    record.Editid = record.id;  
 return this.firestore.collection('users').doc(record.Editid).collection('tasks').snapshotChanges().subscribe(data => {
  this.studenttask = data.map(e => {
    return {
   id: e.payload.doc.id,
   isEdit: false,
   created: e.payload.doc.data()['created'],
   email: e.payload.doc.data()['email'],
   name: e.payload.doc.data()['name'],
   title: e.payload.doc.data()['title'],


 };
})
console.log(this.studenttask);

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
