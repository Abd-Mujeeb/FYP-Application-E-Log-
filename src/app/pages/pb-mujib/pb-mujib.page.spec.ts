import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PbMujibPage } from './pb-mujib.page';

describe('PbMujibPage', () => {
  let component: PbMujibPage;
  let fixture: ComponentFixture<PbMujibPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PbMujibPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PbMujibPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
