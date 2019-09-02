import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAdminPage } from './users-admin.page';

describe('UsersAdminPage', () => {
  let component: UsersAdminPage;
  let fixture: ComponentFixture<UsersAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersAdminPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
