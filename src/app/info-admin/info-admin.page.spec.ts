import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAdminPage } from './info-admin.page';

describe('InfoAdminPage', () => {
  let component: InfoAdminPage;
  let fixture: ComponentFixture<InfoAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoAdminPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
