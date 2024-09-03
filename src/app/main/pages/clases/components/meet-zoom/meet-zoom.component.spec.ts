import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetZoomComponent } from './meet-zoom.component';

describe('MeetZoomComponent', () => {
  let component: MeetZoomComponent;
  let fixture: ComponentFixture<MeetZoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetZoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
