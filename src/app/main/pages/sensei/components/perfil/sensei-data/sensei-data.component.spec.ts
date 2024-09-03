import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenseiDataComponent } from './sensei-data.component';

describe('SenseiDataComponent', () => {
  let component: SenseiDataComponent;
  let fixture: ComponentFixture<SenseiDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenseiDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SenseiDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
