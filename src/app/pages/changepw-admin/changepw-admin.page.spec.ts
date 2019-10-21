import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepwAdminPage } from './changepw-admin.page';

describe('ChangepwAdminPage', () => {
  let component: ChangepwAdminPage;
  let fixture: ComponentFixture<ChangepwAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangepwAdminPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepwAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
