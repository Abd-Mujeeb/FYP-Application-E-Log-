import { TestBed } from '@angular/core/testing';

import { PbsupervisorService } from './pbsupervisor.service';

describe('PbsupervisorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PbsupervisorService = TestBed.get(PbsupervisorService);
    expect(service).toBeTruthy();
  });
});
