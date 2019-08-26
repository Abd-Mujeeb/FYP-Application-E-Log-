import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCpsPage } from './users-cps.page';

describe('UsersCpsPage', () => {
  let component: UsersCpsPage;
  let fixture: ComponentFixture<UsersCpsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersCpsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersCpsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
