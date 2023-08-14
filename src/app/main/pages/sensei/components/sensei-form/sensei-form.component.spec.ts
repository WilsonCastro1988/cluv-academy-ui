import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenseiFormComponent } from './sensei-form.component';

describe('SenseiFormComponent', () => {
  let component: SenseiFormComponent;
  let fixture: ComponentFixture<SenseiFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenseiFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SenseiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
