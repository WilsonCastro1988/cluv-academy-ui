import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenseiSkillInfoComponent } from './sensei-skill-info.component';

describe('SenseiSkillInfoComponent', () => {
  let component: SenseiSkillInfoComponent;
  let fixture: ComponentFixture<SenseiSkillInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenseiSkillInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SenseiSkillInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
