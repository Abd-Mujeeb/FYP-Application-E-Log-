import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersGcPage } from './users-gc.page';

describe('UsersGcPage', () => {
  let component: UsersGcPage;
  let fixture: ComponentFixture<UsersGcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersGcPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersGcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
