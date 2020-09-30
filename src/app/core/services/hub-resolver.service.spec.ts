import { TestBed } from '@angular/core/testing';

import { HubResolverService } from './hub-resolver.service';

describe('HubResolverService', () => {
  let service: HubResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HubResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
