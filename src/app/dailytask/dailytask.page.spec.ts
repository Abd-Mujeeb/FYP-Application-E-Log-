import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailytaskPage } from './dailytask.page';

describe('DailytaskPage', () => {
  let component: DailytaskPage;
  let fixture: ComponentFixture<DailytaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailytaskPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailytaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
