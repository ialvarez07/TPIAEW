import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasRealizadasComponent } from './reservas-realizadas.component';

describe('ReservasRealizadasComponent', () => {
  let component: ReservasRealizadasComponent;
  let fixture: ComponentFixture<ReservasRealizadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservasRealizadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservasRealizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
