import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStudentPage } from './select-student.page';

describe('SelectStudentPage', () => {
  let component: SelectStudentPage;
  let fixture: ComponentFixture<SelectStudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectStudentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
