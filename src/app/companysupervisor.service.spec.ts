import { TestBed } from '@angular/core/testing';

import { companysupervisorService } from './companysupervisor.service';

describe('CompanysupervisorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: companysupervisorService = TestBed.get(companysupervisorService);
    expect(service).toBeTruthy();
  });
});
