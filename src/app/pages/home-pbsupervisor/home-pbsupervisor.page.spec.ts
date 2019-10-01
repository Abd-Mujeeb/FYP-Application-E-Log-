import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePbsupervisorPage } from './home-pbsupervisor.page';

describe('HomePbsupervisorPage', () => {
  let component: HomePbsupervisorPage;
  let fixture: ComponentFixture<HomePbsupervisorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePbsupervisorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePbsupervisorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
