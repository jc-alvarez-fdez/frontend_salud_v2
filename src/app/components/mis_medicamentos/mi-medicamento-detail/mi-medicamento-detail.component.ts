import { Component, Input } from '@angular/core';
import { MiMedicamento, MiMedicamentoResults } from '../../../core/interfaces/medicamento.interface';
import { Router, RouterModule } from '@angular/router';
import { MisMedicamentosService } from '../../../core/services/mis-medicamentos.service';




@Component({
  selector: 'app-mi-medicamento-detail',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './mi-medicamento-detail.component.html',
  styleUrl: './mi-medicamento-detail.component.scss'
})
export class MiMedicamentoDetailComponent {
  @Input() MisMedicamentosInfo!: MiMedicamento;

  constructor(
    private router: Router,
    private _misMedicamentosService: MisMedicamentosService ) { }

}
