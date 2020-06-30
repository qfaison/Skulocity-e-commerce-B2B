import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeratinComponent } from './keratin.component';

describe('KeratinComponent', () => {
  let component: KeratinComponent;
  let fixture: ComponentFixture<KeratinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeratinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeratinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
