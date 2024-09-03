import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenseiSchedulePreferComponent } from './sensei-schedule-prefer.component';

describe('SenseiSchedulePreferComponent', () => {
  let component: SenseiSchedulePreferComponent;
  let fixture: ComponentFixture<SenseiSchedulePreferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenseiSchedulePreferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SenseiSchedulePreferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
