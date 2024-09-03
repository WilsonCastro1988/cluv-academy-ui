import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenseiPersonalInfoComponent } from './sensei-personal-info.component';

describe('SenseiPersonalInfoComponent', () => {
  let component: SenseiPersonalInfoComponent;
  let fixture: ComponentFixture<SenseiPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenseiPersonalInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SenseiPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
