import { TestBed } from '@angular/core/testing';

import { CompanysupervisorService } from './companysupervisor.service';

describe('CompanysupervisorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanysupervisorService = TestBed.get(CompanysupervisorService);
    expect(service).toBeTruthy();
  });
});
