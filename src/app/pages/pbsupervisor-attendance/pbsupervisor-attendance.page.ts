import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/user/student.service';
import { PbsupervisorService } from 'src/app/services/user/pbsupervisor.service';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-pbsupervisor-attendance',
  templateUrl: './pbsupervisor-attendance.page.html',
  styleUrls: ['./pbsupervisor-attendance.page.scss'],
})
export class PbsupervisorAttendancePage implements OnInit {
  
  public attendancelist: any[];
  public loadeditems: any[];
  public eventSource = [];

  public calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  public selectedDate = new Date();

  constructor(  
    private pbsupervisorService: PbsupervisorService,
    ) { }

  ngOnInit() {
    // this.pbsupervisorService.read_pbsupervisor_attendance().subscribe(data => {

    //   this.eventSource = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       name: e.payload.doc.data()['name'],
    //       email: e.payload.doc.data()['email'],
    //       address: e.payload.doc.data()['address'],
    //       timeinstamp: e.payload.doc.data().['timeinstamp'],
    //       timeoutstamp: e.payload.doc.data()['timeoutstamp'],
    //       geoLatitude: e.payload.doc.data()['geoLatitude'],
    //       geoLongitude: e.payload.doc.data()['geoLongitude'],
    //       timeoutLatitude: e.payload.doc.data()['timeoutLatitude'],
    //       timeoutLongitude: e.payload.doc.data()['timeoutLongitude'],
         
    //     };
    //   })
    //   console.log(this.eventSource);
    //   this.eventSource.push(event);
    //   console.log(event);
      
    // });

    this.pbsupervisorService.read_pbsupervisor_attendance().subscribe(colSnap => {
      this.eventSource = [];
      colSnap.forEach(snap => {
        let event:any = snap.payload.doc.data();
        event.id = snap.payload.doc.id;
        event.startTime = event.startTime.toDate();
        event.endTime = event.endTime.toDate();
        event.address = event.address;
        console.log(event);
        this.eventSource.push(event);
      })
    });
   
  }

  
  initializeItems(): void {
    this.attendancelist = this.loadeditems;
  }
  
  filterList(evt){
    this.initializeItems();
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm){
      return;
    }
  
    this.attendancelist = this.attendancelist.filter(currentitems => {
      if (currentitems.name, currentitems.email  && searchTerm) {
        if (currentitems.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        currentitems.email.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ){
          return true;
        }
        return false;
      }
    });
  }

  //calendar
  onViewTitleChanged(title) {
    console.log(title);
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
      this.selectedDate = ev.selectedTime;
      // console.log(this.selectedDate);
  }

  onCurrentDateChanged(event: Date) {
    console.log('current date change: ' + event);
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }
  
  }
  
