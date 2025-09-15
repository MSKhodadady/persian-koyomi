import { TestBed } from '@angular/core/testing';

import { PerDateGenerator } from './per-date-generator';

describe('PerDateGenerator', () => {
  let service: PerDateGenerator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerDateGenerator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
