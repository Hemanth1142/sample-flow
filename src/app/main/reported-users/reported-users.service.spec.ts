import { TestBed } from '@angular/core/testing';

import { ReportedUsersService } from './reported-users.service';

describe('ReportedUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportedUsersService = TestBed.get(ReportedUsersService);
    expect(service).toBeTruthy();
  });
});
