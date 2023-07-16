import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestListComponentComponent } from './test-list-component.component';

describe('TestListComponentComponent', () => {
  let component: TestListComponentComponent;
  let fixture: ComponentFixture<TestListComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestListComponentComponent]
    });
    fixture = TestBed.createComponent(TestListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
