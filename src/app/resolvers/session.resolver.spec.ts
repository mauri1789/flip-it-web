import { TestBed } from '@angular/core/testing';

import { SessionResolver } from './session.resolver';

describe('SessionResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionResolver = TestBed.get(SessionResolver);
    expect(service).toBeTruthy();
  });
});
