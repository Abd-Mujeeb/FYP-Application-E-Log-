import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDatePage } from './select-date.page';

describe('SelectDatePage', () => {
  let component: SelectDatePage;
  let fixture: ComponentFixture<SelectDatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
