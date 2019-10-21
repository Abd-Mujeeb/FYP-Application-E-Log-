import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepwPbPage } from './changepw-pb.page';

describe('ChangepwPbPage', () => {
  let component: ChangepwPbPage;
  let fixture: ComponentFixture<ChangepwPbPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangepwPbPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepwPbPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
