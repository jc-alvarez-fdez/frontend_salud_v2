import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentoDetailComponent } from './medicamento-detail.component';

describe('MedicamentoDetailComponent', () => {
  let component: MedicamentoDetailComponent;
  let fixture: ComponentFixture<MedicamentoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicamentoDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicamentoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
