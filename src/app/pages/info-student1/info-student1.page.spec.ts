import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoStudent1Page } from './info-student1.page';

describe('InfoStudent1Page', () => {
  let component: InfoStudent1Page;
  let fixture: ComponentFixture<InfoStudent1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoStudent1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoStudent1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
