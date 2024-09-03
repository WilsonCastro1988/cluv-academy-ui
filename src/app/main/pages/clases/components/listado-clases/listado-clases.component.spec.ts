import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoClasesComponent } from './listado-clases.component';

describe('ListadoClasesComponent', () => {
  let component: ListadoClasesComponent;
  let fixture: ComponentFixture<ListadoClasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoClasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
