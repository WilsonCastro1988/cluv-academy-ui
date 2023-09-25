import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingZoomFormComponent } from './meeting-zoom-form.component';

describe('MeetingZoomFormComponent', () => {
  let component: MeetingZoomFormComponent;
  let fixture: ComponentFixture<MeetingZoomFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingZoomFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingZoomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
