import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSecurityInfoComponent } from './user-security-info.component';

describe('StudentSecurityInfoComponent', () => {
  let component: UserSecurityInfoComponent;
  let fixture: ComponentFixture<UserSecurityInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSecurityInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSecurityInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
