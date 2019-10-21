import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PbsupervisorChoosePage } from './pbsupervisor-choose.page';

describe('PbsupervisorChoosePage', () => {
  let component: PbsupervisorChoosePage;
  let fixture: ComponentFixture<PbsupervisorChoosePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PbsupervisorChoosePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PbsupervisorChoosePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
