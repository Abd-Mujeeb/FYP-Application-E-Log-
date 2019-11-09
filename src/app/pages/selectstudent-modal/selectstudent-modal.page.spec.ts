import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectstudentModalPage } from './selectstudent-modal.page';

describe('SelectstudentModalPage', () => {
  let component: SelectstudentModalPage;
  let fixture: ComponentFixture<SelectstudentModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectstudentModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectstudentModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
