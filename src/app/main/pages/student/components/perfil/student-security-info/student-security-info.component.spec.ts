import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSecurityInfoComponent } from './student-security-info.component';

describe('StudentSecurityInfoComponent', () => {
  let component: StudentSecurityInfoComponent;
  let fixture: ComponentFixture<StudentSecurityInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentSecurityInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSecurityInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
