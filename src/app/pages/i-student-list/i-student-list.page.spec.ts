import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IStudentListPage } from './i-student-list.page';

describe('IStudentListPage', () => {
  let component: IStudentListPage;
  let fixture: ComponentFixture<IStudentListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IStudentListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IStudentListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
