import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadtaskPage } from './uploadtask.page';

describe('UploadtaskPage', () => {
  let component: UploadtaskPage;
  let fixture: ComponentFixture<UploadtaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadtaskPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadtaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
