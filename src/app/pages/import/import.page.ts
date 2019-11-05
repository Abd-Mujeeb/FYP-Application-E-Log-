import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Papa, PapaParseConfig} from "ngx-papaparse";

interface json{
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
  company: string
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

  constructor(private afs: AngularFirestore,
    private papa: Papa) { 
   


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

    this.dataRef = this.afs.collection<data>('csvjson');
    let i;
    let c = 1;
    for(i = 0; i < c; i++){
      let a = i
      try{
    this.json = {
      number: result.data[i].number,
      displayName: result.data[a].displayName,
      name: result.data[a].name,
      email: result.data[a].email,
      school_dept: result.data[a].school_dept,
      group_code: result.data[a].group_code,
      student_id: result.data[a].student_id,
      role: result.data[a].role,
      change: result.data[a].change,
      gc: result.data[a].gc,
      company: result.data[a].company
    }
    console.log(this.json)
    this.dataRef.add(this.json)
    c++
  }catch{
    console.log('no more data');
    // alert(this.successMsg);
    alert(i + " student details has succesfully saved");
  }
 

}

    // this.dataRef.add(this.json).then( _ => alert(this.successMsg));
    }
    });
    }}}

}
