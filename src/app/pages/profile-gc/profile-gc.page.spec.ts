import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileGcPage } from './profile-gc.page';

describe('ProfileGcPage', () => {
  let component: ProfileGcPage;
  let fixture: ComponentFixture<ProfileGcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileGcPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileGcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
