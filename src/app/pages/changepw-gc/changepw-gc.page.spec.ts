import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepwGcPage } from './changepw-gc.page';

describe('ChangepwGcPage', () => {
  let component: ChangepwGcPage;
  let fixture: ComponentFixture<ChangepwGcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangepwGcPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepwGcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
