import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/user/student.service';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { SelectstudentModalPage } from '../selectstudent-modal/selectstudent-modal.page';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-select-student',
  templateUrl: './select-student.page.html',
  styleUrls: ['./select-student.page.scss'],
})
export class SelectStudentPage implements OnInit {

  public loading: any;
  public student: any[];
  public loadedstudent: any [];
  displayName: string;
  
  constructor(
    private studentService: StudentService,
    public loadingController: LoadingController,
    private modalController: ModalController,
    private navCtrl: NavController,
    private authService: AuthService,

  ) { }

  ngOnInit() {

    if(this.authService.userDetails()){
      this.displayName = this.authService.userDetails().displayName;
    } else {
      this.navCtrl.navigateBack('');
    }

    this.studentService.read_pbsupervisor_student().subscribe(data => {
 
      this.student = data.map(e => {
           return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['displayName'],
          email: e.payload.doc.data()['email'],
          school_dept: e.payload.doc.data()['school_dept'],
          group_code: e.payload.doc.data()['group_code'],
          student_id: e.payload.doc.data()['student_id'],
          company: e.payload.doc.data()['company'],
          gc: e.payload.doc.data()['gc'],
          pbsupervisor: e.payload.doc.data()['pbsupervisor'],
          contactno: e.payload.doc.data()['contactno'],


        };
      })
      console.log(this.student);
   this.loadedstudent = this.student;
  
    });

  }

  initializeItems(): void {
    this.student = this.loadedstudent;
  }

  filterList(evt){
    this.initializeItems();
    const searchTerm = evt.srcElement.value;

    if (!searchTerm){
      return;
    }

    this.student = this.student.filter(currentlist => {
      if (currentlist.name, currentlist.email && searchTerm){
        if (currentlist.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        currentlist.email.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
          return true;
        }
        return false;
      }
    });
  }


  openPreview(record){
    this.modalController.create({
      component: SelectstudentModalPage,
      componentProps: {
        record: record.id,
      }
 
      
    }).then(modal => modal.present());
 
  }


}
