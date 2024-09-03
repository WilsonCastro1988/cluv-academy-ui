import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenseiSecurityInfoComponent } from './sensei-security-info.component';

describe('SenseiSecurityInfoComponent', () => {
  let component: SenseiSecurityInfoComponent;
  let fixture: ComponentFixture<SenseiSecurityInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenseiSecurityInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SenseiSecurityInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
