import { TestBed, inject } from '@angular/core/testing';

import { ReservaService } from './reserva.service';

describe('ReservaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReservaService]
    });
  });

  it('should be created', inject([ReservaService], (service: ReservaService) => {
    expect(service).toBeTruthy();
  }));
});
