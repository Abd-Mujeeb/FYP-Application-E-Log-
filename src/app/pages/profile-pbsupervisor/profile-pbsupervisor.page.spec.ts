import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePbsupervisorPage } from './profile-pbsupervisor.page';

describe('ProfilePbsupervisorPage', () => {
  let component: ProfilePbsupervisorPage;
  let fixture: ComponentFixture<ProfilePbsupervisorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePbsupervisorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePbsupervisorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
