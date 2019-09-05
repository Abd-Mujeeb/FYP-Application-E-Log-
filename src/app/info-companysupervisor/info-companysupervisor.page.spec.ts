import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCompanysupervisorPage } from './info-companysupervisor.page';

describe('InfoCompanysupervisorPage', () => {
  let component: InfoCompanysupervisorPage;
  let fixture: ComponentFixture<InfoCompanysupervisorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCompanysupervisorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCompanysupervisorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
