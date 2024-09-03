import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenseiPrincipalInfoComponent } from './sensei-principal-info.component';

describe('SenseiPrincipalInfoComponent', () => {
  let component: SenseiPrincipalInfoComponent;
  let fixture: ComponentFixture<SenseiPrincipalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenseiPrincipalInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SenseiPrincipalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
