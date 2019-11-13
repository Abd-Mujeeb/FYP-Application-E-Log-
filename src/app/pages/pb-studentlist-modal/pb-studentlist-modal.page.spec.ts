import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PbStudentlistModalPage } from './pb-studentlist-modal.page';

describe('PbStudentlistModalPage', () => {
  let component: PbStudentlistModalPage;
  let fixture: ComponentFixture<PbStudentlistModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PbStudentlistModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PbStudentlistModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
