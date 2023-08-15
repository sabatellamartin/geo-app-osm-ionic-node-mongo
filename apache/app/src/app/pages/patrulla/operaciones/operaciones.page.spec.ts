import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OperacionesPage } from './operaciones.page';

describe('OperacionesPage', () => {
  let component: OperacionesPage;
  let fixture: ComponentFixture<OperacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OperacionesPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OperacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
