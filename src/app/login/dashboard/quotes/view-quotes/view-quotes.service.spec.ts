import { TestBed } from '@angular/core/testing';

import { ViewQuotesService } from './view-quotes.service';

describe('ViewQuotesService', () => {
  let service: ViewQuotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewQuotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
