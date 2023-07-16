import { TestBed } from '@angular/core/testing';

import { ContextMenuServiceService } from './context-menu-service.service';

describe('ContextMenuServiceService', () => {
  let service: ContextMenuServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContextMenuServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
