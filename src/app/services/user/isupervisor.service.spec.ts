import { TestBed } from '@angular/core/testing';

import { IsupervisorService } from './isupervisor.service';

describe('IsupervisorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsupervisorService = TestBed.get(IsupervisorService);
    expect(service).toBeTruthy();
  });
});
