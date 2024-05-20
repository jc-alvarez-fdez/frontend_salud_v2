import { Component, Input } from '@angular/core';
import { MedObtenido, MiMedicamento } from '../../../core/interfaces/medicamento.interface';
import { Router, RouterModule } from '@angular/router';
import { MisMedicamentosService } from '../../../core/services/mis-medicamentos.service';

@Component({
  selector: 'app-medicamento-detail',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './medicamento-detail.component.html',
  styleUrl: './medicamento-detail.component.scss'
})
export class MedicamentoDetailComponent {
  @Input() MedObtenidoInfo!: MedObtenido;

  constructor(
    private router: Router,
    private _misMedicamentosService: MisMedicamentosService ) { }


    addMedicamentoSeleccionado() {
      console.log("hace algo?");
      // Extraer los datos relevantes
      const nombre = this.MedObtenidoInfo.nombre;
      const num_registro = this.MedObtenidoInfo.nregistro;
      const laboratorio = this.MedObtenidoInfo.labtitular;
      const triangulo_seguim = this.MedObtenidoInfo.triangulo;
      const forma_simple = this.MedObtenidoInfo.formaFarmaceuticaSimplificada?.nombre;
      const via_administracion = this.MedObtenidoInfo.viasAdministracion[0].nombre;
      const prospecto = this.MedObtenidoInfo.docs[1].urlHtml;
      const inicio_envase = new Date;
      const contenido_envase = 0;
      const imagen = "";
      const consejos = "";

      // Crear un objeto MiMedicamento
      const nuevoMedicamento: MiMedicamento = {
        nombre,
        num_registro,
        laboratorio,
        triangulo_seguim,
        forma_simple,
        via_administracion,
        prospecto,
        inicio_envase,
        contenido_envase,
        imagen,
        consejos
      };

      // Llamar al servicio para agregar el medicamento
      this._misMedicamentosService.addMedicamento(nuevoMedicamento)
        .subscribe({
          next: (data: MiMedicamento) => {
            // Manejar la adición exitosa
            console.log("Medicamento añadido con éxito:", data);
            // Puedes actualizar la interfaz de usuario o mostrar un mensaje de éxito
          },
          error: (error: any) => {
            // Manejar el error durante la adición
            console.error("Error al añadir medicamento:", error);
            // Puedes mostrar un mensaje de error al usuario
          }
        });
    }


}
