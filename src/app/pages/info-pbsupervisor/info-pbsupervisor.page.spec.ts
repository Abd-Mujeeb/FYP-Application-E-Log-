import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPbsupervisorPage } from './info-pbsupervisor.page';

describe('InfoPbsupervisorPage', () => {
  let component: InfoPbsupervisorPage;
  let fixture: ComponentFixture<InfoPbsupervisorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPbsupervisorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPbsupervisorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
