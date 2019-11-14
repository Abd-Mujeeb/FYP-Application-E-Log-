import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/user/student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-task2',
  templateUrl: './student-task2.page.html',
  styleUrls: ['./student-task2.page.scss'],
})
export class StudentTask2Page implements OnInit {


  public tasklist : any[];
  public loadedstudenttasklist : any[];

  record: any;
  private sub: any;
  start: any;
  end: any;
  
  constructor( 
    private studentService: StudentService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {  

    // this.sub = this.route.params.subscribe(params => {
    //   this.record = params['record']; 
    //   console.log(this.record , 'test 2');
    // });

    this.sub = this.route.params.subscribe(params => {
      this.record = params['id'];
      this.start = params['start'];
     
     
      console.log(this.record , 'ani step 2');
    })
    let studentUID = this.record;
    let start = this.start;
 
    console.log(studentUID , start,  'ani step 3');
    this.studentService.read_student_task2(studentUID, start).subscribe(data => {
      
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
  
    this.tasklist = this.tasklist.filter(currentitems => {
      if (currentitems.title, currentitems.description && searchTerm) {
        if (currentitems.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        currentitems.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ){
          return true;
        }
        return false;
      }
    });
  }
  sliderOpts = {
    zoom: {
      maxRatio: 3
    }
  };


  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  }
  