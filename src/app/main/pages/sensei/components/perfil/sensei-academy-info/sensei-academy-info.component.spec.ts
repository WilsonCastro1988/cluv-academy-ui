import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenseiAcademyInfoComponent } from './sensei-academy-info.component';

describe('SenseiAcademyInfoComponent', () => {
  let component: SenseiAcademyInfoComponent;
  let fixture: ComponentFixture<SenseiAcademyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenseiAcademyInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SenseiAcademyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
