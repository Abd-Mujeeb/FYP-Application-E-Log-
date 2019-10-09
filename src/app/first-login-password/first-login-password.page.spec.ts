import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstLoginPasswordPage } from './first-login-password.page';

describe('FirstLoginPasswordPage', () => {
  let component: FirstLoginPasswordPage;
  let fixture: ComponentFixture<FirstLoginPasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstLoginPasswordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstLoginPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
