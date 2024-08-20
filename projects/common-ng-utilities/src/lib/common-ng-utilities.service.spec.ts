import { TestBed } from '@angular/core/testing';

import { PeopleOsUtilitiesService } from './common-ng-utilities.service';

describe('CommonNgUtilitiesService', () => {
  let service: PeopleOsUtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeopleOsUtilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
