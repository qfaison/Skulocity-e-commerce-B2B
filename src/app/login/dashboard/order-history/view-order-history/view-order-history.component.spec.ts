import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderHistoryComponent } from './view-order-history.component';

describe('ViewOrderHistoryComponent', () => {
  let component: ViewOrderHistoryComponent;
  let fixture: ComponentFixture<ViewOrderHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOrderHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
