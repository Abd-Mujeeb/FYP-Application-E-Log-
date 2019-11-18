import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcStudentPage } from './gc-student.page';

describe('GcStudentPage', () => {
  let component: GcStudentPage;
  let fixture: ComponentFixture<GcStudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GcStudentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GcStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
