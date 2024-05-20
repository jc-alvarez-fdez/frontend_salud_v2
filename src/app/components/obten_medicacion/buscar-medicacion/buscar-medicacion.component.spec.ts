import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarMedicacionComponent } from './buscar-medicacion.component';

describe('BuscarMedicacionComponent', () => {
  let component: BuscarMedicacionComponent;
  let fixture: ComponentFixture<BuscarMedicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarMedicacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscarMedicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
