import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPrincipalInfoComponent } from './student-principal-info.component';

describe('StudentPrincipalInfoComponent', () => {
  let component: StudentPrincipalInfoComponent;
  let fixture: ComponentFixture<StudentPrincipalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentPrincipalInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPrincipalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
