import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTaskPage } from './student-task.page';

describe('StudentTaskPage', () => {
  let component: StudentTaskPage;
  let fixture: ComponentFixture<StudentTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTaskPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
