import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceDetailsPage } from './attendance-details.page';

describe('AttendanceDetailsPage', () => {
  let component: AttendanceDetailsPage;
  let fixture: ComponentFixture<AttendanceDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
