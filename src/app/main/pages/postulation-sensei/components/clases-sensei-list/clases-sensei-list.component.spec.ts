import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasesSenseiListComponent } from './clases-sensei-list.component';

describe('ClasesSenseiListComponent', () => {
  let component: ClasesSenseiListComponent;
  let fixture: ComponentFixture<ClasesSenseiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasesSenseiListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClasesSenseiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
