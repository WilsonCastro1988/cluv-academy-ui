import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPersonalInfoComponent } from './student-personal-info.component';

describe('StudentPersonalInfoComponent', () => {
  let component: StudentPersonalInfoComponent;
  let fixture: ComponentFixture<StudentPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentPersonalInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
