import { TestBed } from '@angular/core/testing';

import { ServicesLogin } from './services.login';

describe('ServicesLogin', () => {
  let service: ServicesLogin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesLogin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
