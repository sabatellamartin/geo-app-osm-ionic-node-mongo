import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComandoPage } from './comando.page';

describe('ComandoPage', () => {
  let component: ComandoPage;
  let fixture: ComponentFixture<ComandoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComandoPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComandoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
