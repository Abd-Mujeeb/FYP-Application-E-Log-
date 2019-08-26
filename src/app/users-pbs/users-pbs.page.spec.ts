import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPbsPage } from './users-pbs.page';

describe('UsersPbsPage', () => {
  let component: UsersPbsPage;
  let fixture: ComponentFixture<UsersPbsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersPbsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPbsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
