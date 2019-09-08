import { TestBed } from '@angular/core/testing';

import { gcService } from './gc.service';

describe('GcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: gcService = TestBed.get(gcService);
    expect(service).toBeTruthy();
  });
});
