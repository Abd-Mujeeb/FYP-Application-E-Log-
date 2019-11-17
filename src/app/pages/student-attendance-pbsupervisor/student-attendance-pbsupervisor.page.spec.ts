import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendancePbsupervisorPage } from './student-attendance-pbsupervisor.page';

describe('StudentAttendancePbsupervisorPage', () => {
  let component: StudentAttendancePbsupervisorPage;
  let fixture: ComponentFixture<StudentAttendancePbsupervisorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAttendancePbsupervisorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAttendancePbsupervisorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
