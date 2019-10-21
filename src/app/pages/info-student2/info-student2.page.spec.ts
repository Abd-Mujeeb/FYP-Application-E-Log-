import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoStudent2Page } from './info-student2.page';

describe('InfoStudent2Page', () => {
  let component: InfoStudent2Page;
  let fixture: ComponentFixture<InfoStudent2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoStudent2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoStudent2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
