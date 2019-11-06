import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterGcPage } from './register-gc.page';

describe('RegisterGcPage', () => {
  let component: RegisterGcPage;
  let fixture: ComponentFixture<RegisterGcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterGcPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterGcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
