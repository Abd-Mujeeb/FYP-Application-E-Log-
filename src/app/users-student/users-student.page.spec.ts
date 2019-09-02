import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersStudentPage } from './users-student.page';

describe('UsersStudentPage', () => {
  let component: UsersStudentPage;
  let fixture: ComponentFixture<UsersStudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersStudentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
