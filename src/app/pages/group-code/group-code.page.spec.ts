import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCodePage } from './group-code.page';

describe('GroupCodePage', () => {
  let component: GroupCodePage;
  let fixture: ComponentFixture<GroupCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupCodePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
