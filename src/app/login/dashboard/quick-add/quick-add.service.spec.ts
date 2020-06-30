import { TestBed } from '@angular/core/testing';

import { QuickAddService } from './quick-add.service';

describe('QuickAddService', () => {
  let service: QuickAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuickAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
