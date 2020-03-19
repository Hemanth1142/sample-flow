import { TestBed } from '@angular/core/testing';

import { ReportedVideosService } from './reported-videos.service';

describe('ReportedVideosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportedVideosService = TestBed.get(ReportedVideosService);
    expect(service).toBeTruthy();
  });
});
