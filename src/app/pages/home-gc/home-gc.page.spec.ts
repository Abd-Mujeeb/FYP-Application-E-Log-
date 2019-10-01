import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGcPage } from './home-gc.page';

describe('HomeGcPage', () => {
  let component: HomeGcPage;
  let fixture: ComponentFixture<HomeGcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeGcPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
