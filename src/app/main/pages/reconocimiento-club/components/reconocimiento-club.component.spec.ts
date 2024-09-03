import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconocimientoClubComponent } from './reconocimiento-club.component';

describe('ReconocimientoClubComponent', () => {
  let component: ReconocimientoClubComponent;
  let fixture: ComponentFixture<ReconocimientoClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconocimientoClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReconocimientoClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
