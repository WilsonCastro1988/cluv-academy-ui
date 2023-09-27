import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasesStudentListComponent } from './clases-student-list.component';

describe('ClasesStudentListComponent', () => {
  let component: ClasesStudentListComponent;
  let fixture: ComponentFixture<ClasesStudentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasesStudentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClasesStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
