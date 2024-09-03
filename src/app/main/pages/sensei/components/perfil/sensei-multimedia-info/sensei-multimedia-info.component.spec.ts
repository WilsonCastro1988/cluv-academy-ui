import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenseiMultimediaInfoComponent } from './sensei-multimedia-info.component';

describe('SenseiMultimediaInfoComponent', () => {
  let component: SenseiMultimediaInfoComponent;
  let fixture: ComponentFixture<SenseiMultimediaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenseiMultimediaInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SenseiMultimediaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
