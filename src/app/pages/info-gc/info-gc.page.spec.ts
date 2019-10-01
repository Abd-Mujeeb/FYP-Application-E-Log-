import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoGcPage } from './info-gc.page';

describe('InfoGcPage', () => {
  let component: InfoGcPage;
  let fixture: ComponentFixture<InfoGcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoGcPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoGcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
