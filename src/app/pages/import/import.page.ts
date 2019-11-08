import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Papa} from "ngx-papaparse";
import { AngularFireAuth } from 'angularfire2/auth';
import * as admin from 'firebase-admin';
import { AuthService } from 'src/app/services/user/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { StudentService } from 'src/app/services/user/student.service';


@Component({
  selector: 'app-import',
  templateUrl: './import.page.html',
  styleUrls: ['./import.page.scss'],
})
export class ImportPage implements OnInit {

  public loading: any;
  public student: any[];
  public loadedstudent: any [];

  constructor(private afs: AngularFirestore,
    private papa: Papa,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private studentService: StudentService,
    public loadingController: LoadingController
    ) { 

  }
  ngOnInit() {
    this.studentService.read_student().subscribe(data => {
 
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
    complete: (result)=> {
    console.log('Parsed: ', result);
    
    let i;
    let c = 1;
    for(i = 0; i < c; i++){
      try{
    
      const number: string = result.data[i].number;
      const displayName: string = result.data[i].displayName;
      const name: string = result.data[i].name;
      const email: string = result.data[i].email;
      const school_dept: string = result.data[i].school_dept;
      const group_code: string = result.data[i].group_code;
      const student_id: string = result.data[i].student_id;
      const role: string = result.data[i].role;
      const change: boolean = result.data[i].change;
      const gc: string = result.data[i].gc;
      const company: string = result.data[i].company;
      const password: string = result.data[i].password;
    
  
    // console.log(this.json.displayName)
    // console.log(this.json.password)
    // this.dataRef.add(this.json)
  
    this.authService.csvstudent( number, displayName, name, email, school_dept, group_code, student_id, role, change, gc, company, password)
    // .then(
    //   () => {
    //     this.loading.dismiss().then(async () => {

    //       const alert = await this.alertCtrl.create({
    //         message: i + 'Account successfully created',
    //       });
         
    //       await alert.present();
    //     });

    //   },
    //   error => {
    //     this.loading.dismiss().then(async () => {
    //       const alert = await this.alertCtrl.create({
    //         message: error.message,
    //         buttons: [{ text: 'Ok', role: 'cancel' }],
    //       });
    //       await alert.present();
    //     });
    //   }
    // );
    // this.loading = this.loadingController.create();
    // this.loading.present();

    c++
  }catch{
    console.log('no more data');
    // alert(this.successMsg);
    alert("Total of Account : " + i);
  }
 

}
    }
    });
    }}}}


    
    
}
