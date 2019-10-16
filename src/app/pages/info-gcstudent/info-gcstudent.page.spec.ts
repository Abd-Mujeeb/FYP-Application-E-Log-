import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoGcstudentPage } from './info-gcstudent.page';

describe('InfoGcstudentPage', () => {
  let component: InfoGcstudentPage;
  let fixture: ComponentFixture<InfoGcstudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoGcstudentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoGcstudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
