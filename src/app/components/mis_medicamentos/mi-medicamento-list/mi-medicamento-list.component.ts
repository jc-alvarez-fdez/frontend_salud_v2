import { Component, Input } from '@angular/core';
import { MiMedicamento, MiMedicamentoResults } from '../../../core/interfaces/medicamento.interface';
import { Router, RouterModule } from '@angular/router';
import { MisMedicamentosService } from '../../../core/services/mis-medicamentos.service';




@Component({
  selector: 'app-mi-medicamento-list',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './mi-medicamento-list.component.html',
  styleUrl: './mi-medicamento-list.component.scss'
})
export class MiMedicamentoListComponent {
  @Input() MisMedicamentosInfo!: MiMedicamento;

  constructor(
    private router: Router,
    private _misMedicamentosService: MisMedicamentosService ) { }

}
