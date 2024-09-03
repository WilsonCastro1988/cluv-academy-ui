import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulationStudentListComponent } from './postulation-student-list.component';

describe('PostulationStudentListComponent', () => {
  let component: PostulationStudentListComponent;
  let fixture: ComponentFixture<PostulationStudentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostulationStudentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulationStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
