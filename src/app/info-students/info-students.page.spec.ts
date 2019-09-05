import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoStudentsPage } from './info-students.page';

describe('InfoStudentsPage', () => {
  let component: InfoStudentsPage;
  let fixture: ComponentFixture<InfoStudentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoStudentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoStudentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
