import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesPagePage } from './themes-page.page';

describe('ThemesPagePage', () => {
  let component: ThemesPagePage;
  let fixture: ComponentFixture<ThemesPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemesPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemesPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
