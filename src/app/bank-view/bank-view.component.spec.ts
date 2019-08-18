import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankViewComponent } from './bank-view.component';

describe('BankViewComponent', () => {
  let component: BankViewComponent;
  let fixture: ComponentFixture<BankViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
