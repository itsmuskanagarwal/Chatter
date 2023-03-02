import { TestBed } from '@angular/core/testing';

import { NewAuthGuard } from './new-auth.guard';

describe('NewAuthGuard', () => {
  let guard: NewAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NewAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
