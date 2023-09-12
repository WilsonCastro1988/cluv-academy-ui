import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulationSenseiListComponent } from './postulation-sensei-list.component';

describe('PostulationSenseiListComponent', () => {
  let component: PostulationSenseiListComponent;
  let fixture: ComponentFixture<PostulationSenseiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostulationSenseiListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulationSenseiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
