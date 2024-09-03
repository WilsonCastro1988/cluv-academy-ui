import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSenseiComponent } from './add-sensei.component';

describe('AddSenseiComponent', () => {
  let component: AddSenseiComponent;
  let fixture: ComponentFixture<AddSenseiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSenseiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSenseiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
