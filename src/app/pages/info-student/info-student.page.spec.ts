import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoStudentPage } from './info-student.page';

describe('InfoStudentPage', () => {
  let component: InfoStudentPage;
  let fixture: ComponentFixture<InfoStudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoStudentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
