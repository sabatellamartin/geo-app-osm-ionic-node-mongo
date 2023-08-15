import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrganismosPage } from './organismos.page';

describe('OrganismosPage', () => {
  let component: OrganismosPage;
  let fixture: ComponentFixture<OrganismosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganismosPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrganismosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
