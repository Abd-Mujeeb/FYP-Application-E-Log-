import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTask2Page } from './student-task2.page';

describe('StudentTask2Page', () => {
  let component: StudentTask2Page;
  let fixture: ComponentFixture<StudentTask2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTask2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTask2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
