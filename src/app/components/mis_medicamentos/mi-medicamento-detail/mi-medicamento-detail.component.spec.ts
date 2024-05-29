import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiMedicamentoDetailComponent } from './mi-medicamento-detail.component';

describe('MiMedicamentoDetailComponent', () => {
  let component: MiMedicamentoDetailComponent;
  let fixture: ComponentFixture<MiMedicamentoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiMedicamentoDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiMedicamentoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
