import { TestBed } from '@angular/core/testing';

import { pbsupervisorService } from './pbsupervisor.service';

describe('PbsupervisorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: pbsupervisorService = TestBed.get(pbsupervisorService);
    expect(service).toBeTruthy();
  });
});
