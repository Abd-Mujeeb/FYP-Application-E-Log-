import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeIsupervisorPage } from './home-isupervisor.page';

describe('HomeIsupervisorPage', () => {
  let component: HomeIsupervisorPage;
  let fixture: ComponentFixture<HomeIsupervisorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeIsupervisorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeIsupervisorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
