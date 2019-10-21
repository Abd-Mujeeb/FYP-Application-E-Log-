import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoStudent3Page } from './info-student3.page';

describe('InfoStudent3Page', () => {
  let component: InfoStudent3Page;
  let fixture: ComponentFixture<InfoStudent3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoStudent3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoStudent3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
