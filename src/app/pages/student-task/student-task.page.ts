import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/user/student.service';

@Component({
  selector: 'app-student-task',
  templateUrl: './student-task.page.html',
  styleUrls: ['./student-task.page.scss'],
})
export class StudentTaskPage implements OnInit {

  public tasklist : any [];
  public loadedstudenttasklist : any [];

  constructor( 
    private studentService: StudentService,
    ) { }

  ngOnInit() {  
    this.studentService.read_task().subscribe(data => {

      this.tasklist = data.map(e => {
        return { 
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          email: e.payload.doc.data()['email'],
          title: e.payload.doc.data()['title'],
          description: e.payload.doc.data()['description'],
          image: e.payload.doc.data()['image'],
          pickdate: e.payload.doc.data()['pickdate'],
        };
      })
      console.log(this.tasklist);
      this.loadedstudenttasklist = this.tasklist;
    });


  }

  initializeItems(): void {
    this.tasklist = this.loadedstudenttasklist;
  }

  filterList(evt){
    this.initializeItems();
    const searchTerm = evt.srcElement.value;

    if (!searchTerm){
      return;
    }

    this.tasklist = this.tasklist.filter(currentlist => {
      if (currentlist.name && searchTerm){
        if (currentlist.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ){
          return true;
        }
        return false;
      }
    });
  }


 
  UpdateRecord(recordRow) {
    let record = {};
    record['name'] = recordRow.Editname;
    record['email'] = recordRow.Editemail;
    record['title'] = recordRow.Edittitle;
    record['image'] = recordRow.Editimage;
    record['pickdate'] = recordRow.Editpickdate;
    this.studentService.update_student(recordRow.id, record);
    recordRow.isEdit = false;
  }

  RemoveRecord(rowID) {
    this.studentService.delete_student(rowID);
  }



}