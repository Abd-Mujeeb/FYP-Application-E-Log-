import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PbsupervisorService } from 'src/app/services/user/pbsupervisor.service';
import { start } from 'repl';

@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.page.html',
  styleUrls: ['./select-date.page.scss'],
})
export class SelectDatePage implements OnInit {

  record: any;
  private sub: any;
  public studentlist: any[];
  public loadedstudentlist: any[];
start;
end;
specific;
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private modalController: ModalController,
    private pbsupervisorService: PbsupervisorService,
    
  ) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.record = params['id'];
      console.log(this.record , 'ani step 2');
    })
    let studentUID = this.record;
    console.log(studentUID , 'ani step 3');
    this.pbsupervisorService.read_student(studentUID).subscribe(data => {

      this.studentlist = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['displayName'],
   
        };
      })
      console.log(this.studentlist);
      this.loadedstudentlist = this.studentlist;

    });
  }


  read_studenttask_range(record){
    let start = this.start;
    let end = this.end;
    console.log(start, end, 'apa ini?')
    let recordId = record ? record.id : null;
    this.router.navigate(['/student-task', { id: recordId , start: start, end: end }]);
    console.log(recordId, start, end, 'ani step 1 (forward data ID)');
   
  }
  read_studenttask_specific(record){
    let start = this.specific;
    
    console.log(start, 'apa ini?')
    let recordId = record ? record.id : null;
    this.router.navigate(['/student-task2', { id: recordId , start: start, }]);
    console.log(recordId, start,  'ani step 1 (forward data ID)');
   
  }

}
