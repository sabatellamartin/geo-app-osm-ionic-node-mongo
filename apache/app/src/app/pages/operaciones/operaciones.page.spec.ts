import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionesPage } from './operaciones.page';

describe('OperacionesPage', () => {
  let component: OperacionesPage;
  let fixture: ComponentFixture<OperacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OperacionesPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
