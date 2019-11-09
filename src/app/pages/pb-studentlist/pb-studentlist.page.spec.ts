import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PbStudentlistPage } from './pb-studentlist.page';

describe('PbStudentlistPage', () => {
  let component: PbStudentlistPage;
  let fixture: ComponentFixture<PbStudentlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PbStudentlistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PbStudentlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
