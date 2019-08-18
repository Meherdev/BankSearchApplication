import { TestBed } from '@angular/core/testing';

import { BankHttpService } from './bank-http.service';

describe('BankHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BankHttpService = TestBed.get(BankHttpService);
    expect(service).toBeTruthy();
  });
});
