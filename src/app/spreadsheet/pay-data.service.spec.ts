import { TestBed } from '@angular/core/testing';

import { PayDataService } from './pay-data.service';

describe('PayDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayDataService = TestBed.get(PayDataService);
    expect(service).toBeTruthy();
  });
});
