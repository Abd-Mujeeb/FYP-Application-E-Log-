import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpbsupervisorModalPage } from './editpbsupervisor-modal.page';

describe('EditpbsupervisorModalPage', () => {
  let component: EditpbsupervisorModalPage;
  let fixture: ComponentFixture<EditpbsupervisorModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpbsupervisorModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpbsupervisorModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
