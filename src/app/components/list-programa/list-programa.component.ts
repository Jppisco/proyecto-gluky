import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramaService } from 'src/app/services/programa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-programa',
  templateUrl: './list-programa.component.html',
  styleUrls: ['./list-programa.component.css']
})
export class ListProgramaComponent implements OnInit {
  id_instancia: string | null;
  programas: any[] = [];
  programa: any[] = [];
  ngOnInit(): void {
    this.getProgramas()
    this.getpro();

  }
  constructor(
    private _programaService: ProgramaService,
    private aRoute: ActivatedRoute,
  ) {
    this.id_instancia = this.aRoute.snapshot.paramMap.get('id_instancia');
    console.log(this.id_instancia)
  }
  getpro() {
    if (this.id_instancia !== null) {
      return this.getProgramaId(this.id_instancia)
    }
  }
  //metodo que retorna todos los datos de los usuarios y se almacenan en un arreglo
  getProgramas() {
    this._programaService.getProgramas().subscribe(data => {
      this.programas = [];
      data.forEach((element: any) => {
        this.programas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })

      });
      console.log(this.programas)
    })
  }
  getProgramaId(id_instancia: string) {
    this._programaService.getProgramasBy(id_instancia).subscribe(data => {
      this.programa = data.map((element: any) => {
        const fechaCreacion = element.payload.doc.data().fechaCreacion.toDate();
        const fechaActualizacion = element.payload.doc.data().fechaActualizacion.toDate();
        const opcionesDeFormato = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',

        };
        const fechaFormateadaCreacion = fechaCreacion.toLocaleString(undefined, opcionesDeFormato);
        const fechaFormateadaActualizacion = fechaActualizacion.toLocaleString(undefined, opcionesDeFormato);

        return {
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
          fechaCreacion: fechaFormateadaCreacion,
          fechaActualizacion: fechaFormateadaActualizacion,

        };
      });
      console.log(this.programa)
    })
  }

  //hacemos una funcion que no trae una la consulta de todas las intancias
  eliminarPrograma(id: string) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: "Esta Accion es irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._programaService.eliminarPrograma(id).then(() => {
          console.log(id);
          console.log('programa eliminada correctamente')
        }).catch(error => {
          console.log(error)
        })
        Swal.fire(
          'Eliminado!',
          'El programa ha sido borrada correctamente.',
          'success'
        )
      }
    })


  }


}
