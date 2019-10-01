import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStudentPage } from './home-student.page';

describe('HomeStudentPage', () => {
  let component: HomeStudentPage;
  let fixture: ComponentFixture<HomeStudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeStudentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
