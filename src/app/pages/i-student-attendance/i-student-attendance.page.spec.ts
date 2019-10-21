import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IStudentAttendancePage } from './i-student-attendance.page';

describe('IStudentAttendancePage', () => {
  let component: IStudentAttendancePage;
  let fixture: ComponentFixture<IStudentAttendancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IStudentAttendancePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IStudentAttendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
