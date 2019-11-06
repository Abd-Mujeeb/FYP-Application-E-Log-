import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Papa} from "ngx-papaparse";
import { AngularFireAuth } from 'angularfire2/auth';
import * as admin from 'firebase-admin';

var config = {
  apiKey: "AIzaSyDFNM5AsLEAoYQhtnZ7XYRfMZWrvbgdZ0Q",
  authDomain: "e-log-eab02.firebaseapp.com",
  databaseURL: "https://e-log-eab02.firebaseio.com",
};
var secondaryApp = firebase.initializeApp(config, "Secondary");


interface auth{
  album: string;
  year: string;
  US_peak_chart_post: string;
}

interface data{
  number: number,
  displayName: string,
  name: string,
  email: string,
  school_dept: string,
  group_code: string,
  student_id: string,
  role: string,
  change: boolean,
  gc: string,
  company: string,
  password: string
}

interface metadata {
  
}

@Component({
  selector: 'app-import',
  templateUrl: './import.page.html',
  styleUrls: ['./import.page.scss'],
})
export class ImportPage implements OnInit {

  csv;
  json: data;
  successMsg = 'Data successfully saved.';
  dataRef: AngularFirestoreCollection<data>;
  data: Observable<data[]>;
  id: any[];
  metadata: any;
  

  constructor(private afs: AngularFirestore,
    private papa: Papa,
    auth: AngularFireAuth) { 
   


  }

  loadCSV(){

  }

  ngOnInit() {

}


    changeListener(files: FileList){
    console.log(files);
    if(files && files.length > 0) {
    let file : File = files.item(0); 
    console.log(file.name);
    console.log(file.size);
    console.log(file.type);
    let reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
    let csv: string = reader.result as string;
    console.log(csv);
    this.papa.parse(csv,{
    header: true,
    complete: (result) => {
    console.log('Parsed: ', result);
    console.log('Parsed: ', result.data['1']);

    this.dataRef = this.afs.collection<data>('studentcsv');
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
  
    secondaryApp.auth().createUserWithEmailAndPassword(email, password).then((newUserCredential: firebase.auth.UserCredential)=> {
      firebase
        .firestore()
        .doc(`/studentcsv/${newUserCredential.user.uid}`)
        .set({number, displayName, name, email, school_dept, group_code, student_id, role, change, gc, company, password});
        console.log("studentcsv " + newUserCredential.user.email + " created successfully!");
        secondaryApp.auth().signOut();
    }).catch(error => {
      console.error(error);
      throw new Error(error);
    });

    c++
  }catch{
    console.log('no more data');
    // alert(this.successMsg);
    alert(i + " student details has succesfully saved");
  }
 

}
    }
    });
    }}}


    
}
