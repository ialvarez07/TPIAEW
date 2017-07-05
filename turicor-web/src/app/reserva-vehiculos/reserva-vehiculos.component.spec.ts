import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaVehiculosComponent } from './reserva-vehiculos.component';

describe('ReservaVehiculosComponent', () => {
  let component: ReservaVehiculosComponent;
  let fixture: ComponentFixture<ReservaVehiculosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservaVehiculosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
