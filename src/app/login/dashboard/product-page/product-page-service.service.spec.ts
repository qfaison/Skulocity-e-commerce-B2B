import { TestBed } from '@angular/core/testing';

import { ProductPageServiceService } from './product-page-service.service';

describe('ProductPageServiceService', () => {
  let service: ProductPageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductPageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
