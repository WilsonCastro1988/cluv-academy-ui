import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSumaryComponent } from './order-sumary.component';

describe('OrderSumaryComponent', () => {
  let component: OrderSumaryComponent;
  let fixture: ComponentFixture<OrderSumaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSumaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderSumaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
