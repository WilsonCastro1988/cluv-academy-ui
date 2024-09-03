import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenseiBankInfoComponent } from './sensei-bank-info.component';

describe('SenseiBankInfoComponent', () => {
  let component: SenseiBankInfoComponent;
  let fixture: ComponentFixture<SenseiBankInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenseiBankInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SenseiBankInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
