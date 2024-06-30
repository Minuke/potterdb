import { TestBed } from '@angular/core/testing';

import { PotterdbService } from './potterdb.service';

describe('PotterdbService', () => {
  let service: PotterdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PotterdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});