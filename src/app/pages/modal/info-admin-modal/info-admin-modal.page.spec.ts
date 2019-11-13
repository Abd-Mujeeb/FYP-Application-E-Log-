import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAdminModalPage } from './info-admin-modal.page';

describe('InfoAdminModalPage', () => {
  let component: InfoAdminModalPage;
  let fixture: ComponentFixture<InfoAdminModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoAdminModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAdminModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
