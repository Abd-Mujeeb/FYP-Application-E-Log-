import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcStudentlistModalPage } from './gc-studentlist-modal.page';

describe('GcStudentlistModalPage', () => {
  let component: GcStudentlistModalPage;
  let fixture: ComponentFixture<GcStudentlistModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GcStudentlistModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GcStudentlistModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
