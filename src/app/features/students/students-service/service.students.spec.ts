import { TestBed } from '@angular/core/testing';

import { ServiceStudents } from './service.students';

describe('ServiceStudents', () => {
  let service: ServiceStudents;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceStudents);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
