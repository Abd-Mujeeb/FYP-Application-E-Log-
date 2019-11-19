import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/user/student.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase/app';
import { Papa} from "ngx-papaparse";
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from 'src/app/services/user/auth.service';
import { switchMap } from 'rxjs/operators';

export interface Item {
  displayName: string;
  school_dept: string;
}
@Component({
  selector: 'app-info-student',
  templateUrl: './info-student.page.html',
  styleUrls: ['./info-student.page.scss'],
})
export class InfoStudentPage implements OnInit {

  displayName: string;
  public loading: any;
  public student: any[];
  public loadedstudent: any [];

  public all: boolean = false;

  public buttonClicked: boolean = false; //Whatever you want to initialise it as

    public onButtonClick() {

        this.buttonClicked = !this.buttonClicked;
    }

  constructor(private afs: AngularFirestore,
    private papa: Papa,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private studentService: StudentService,
    public loadingController: LoadingController,
    private navCtrl: NavController,
    ) { 

  }

   filterByschool_dept(school_dept: string|null) {
    if(school_dept == 'All'){
      this.all = false;
      return this.ngOnInit();
 }else{
  this.afs.collection('users', ref => ref.where('role', '==', 'student').where('school_dept', '==', school_dept)).snapshotChanges().subscribe(data => {
 
    school_dept = data['school_dept']
    this.student = data.map(e => {
         return {
        id: e.payload.doc.id,
        name: e.payload.doc.data()['displayName'],
        email: e.payload.doc.data()['email'],
        school_dept: e.payload.doc.data()['school_dept'],
        group_code: e.payload.doc.data()['group_code'],
        student_id: e.payload.doc.data()['student_id'],
        company: e.payload.doc.data()['company'],
        gc: e.payload.doc.data()['gc'],
        pbsupervisor: e.payload.doc.data()['pbsupervisor'],
        contactno: e.payload.doc.data()['contactno'],
        role: e.payload.doc.data()['role'],
  
  
      };
    })
    console.log(this.student);
  this.loadedstudent = this.student;
  this.all = true;
  
  });
}


  }

  ngOnInit() {

    if(this.authService.userDetails()){
      this.displayName = this.authService.userDetails().displayName;
    } else {
      this.navCtrl.navigateBack('');
    }
    

    this.studentService.read_student().subscribe(data => {
 
      this.student = data.map(e => {
           return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['displayName'],
          email: e.payload.doc.data()['email'],
          school_dept: e.payload.doc.data()['school_dept'],
          group_code: e.payload.doc.data()['group_code'],
          student_id: e.payload.doc.data()['student_id'],
          company: e.payload.doc.data()['company'],
          pbsupervisor: e.payload.doc.data()['pbsupervisor'],
          contact_no: e.payload.doc.data()['contact_no'],
          
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
      if (currentlist.name, currentlist.email, currentlist.school_dept, currentlist.group_code, currentlist.student_id, currentlist.company, currentlist.pbsupervisor, currentlist.contact_no && searchTerm){
        if (currentlist.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        currentlist.email.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        currentlist.school_dept.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        currentlist.group_code.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        currentlist.student_id.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        currentlist.company.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        currentlist.pbsupervisor.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        currentlist.contact_no.toString().indexOf(searchTerm.toString()) > -1){
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
    record.Editgroup_code = record.group_code;
    record.Editstudent_id = record.student_id;
    record.Editcompany = record.company;
  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['displayName'] = recordRow.Editname;
    record['email'] = recordRow.Editemail;
    record['school_dept'] = recordRow.Editschool_dept;
    record['group_code'] = recordRow.Editgroup_code;
    record['student_id'] = recordRow.Editstudent_id;
    record['company'] = recordRow.Editcompany;
    this.studentService.update_student(recordRow.id, record);
    recordRow.isEdit = false;
  }

  RemoveRecord(rowID) {
    this.studentService.delete_student(rowID);
  }

  async presentAlertConfirm(rowID) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Message <strong>Are you sure to remove user? </br>click "confirm" to permanantly delete user</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            console.log('Confirm');
            this.studentService.delete_student(rowID);
          }
        }
      ]
    });

    await alert.present();
  }



    changeListener(files: FileList) {
    console.log(files);
    if(files && files.length > 0) {
    let file : File = files.item(0); 
    console.log(file.name);
    console.log(file.size);
    console.log(file.type);
    var csv = file.type
    if(!csv.includes('application/vnd.ms-excel')){
      alert('Please select correct file format');
    }else{
    let reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
    let csv: string = reader.result as string;
    console.log(csv);
    this.papa.parse(csv,{
    header: true,
    complete: async (result) => {
    console.log('Parsed: ', result);
    
    let i;
    for(i = 0; i < result.data.length; i++){
      try{
    
      const number: string = result.data[i].number;
      const name: string = result.data[i].name;
      const email: string = result.data[i].email;
      const school_dept: string = result.data[i].school_dept;
      const group_code: string = result.data[i].group_code;
      const student_id: string = result.data[i].student_id;
      const contact_no: string = result.data[i].contact_no;
      const company: string = result.data[i].company;
      const password: string = result.data[i].password;
     
    
 
    await this.authService.csvstudent( number, name, email, school_dept, group_code, student_id, company, contact_no, password);
  }catch{
    console.log('no more data');

  }

  await this.loadingController.create({
    message: i + ' account(s) succesfully created',
    duration: 10000
  }).then((res) => {
    res.present();

    res.onDidDismiss().then((dis) => {
      console.log('Loading dismissed! after 10 Seconds');
     
      
    });
    
  });

  // alert("Total of Account : " + i);

}
    }
    });
    }}}}


  
    

  
}
