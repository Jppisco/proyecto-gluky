import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.css']
})
export class ListUsuarioComponent implements OnInit {
  id_programa: string | null;
  id_instancia: string | null;
  usuarios: any[] = [];
  usuario: any[] = [];


  ngOnInit(): void {
    
    this.getusu();
    this.getUsuarios()


  }

  constructor(
    private _usuarioService: UsuarioService,
    private aRoute: ActivatedRoute,
  ) {
    this.id_programa = this.aRoute.snapshot.paramMap.get('id_programa');
    console.log(this.id_programa)
    this.id_instancia = this.aRoute.snapshot.paramMap.get('id_instancia');
    console.log(this.id_instancia)
  }

  getusu() {
    if (this.id_programa !== null) {
      return this.getUsuarioId(this.id_programa)
    }
  }
  getUsuarioId(id_programa: string) {
    this._usuarioService.getUsuariosBy(id_programa).subscribe(data => {
      this.usuario = data.map((element: any) => {
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
      console.log(this.usuario)
    })
  }


  //hacemos una funcion que no trae una la consulta de todas las intancias
  eliminarUsuario(id: string) {
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
        this._usuarioService.eliminarUsuario(id).then(() => {
          console.log(id);
          console.log('usuario eliminada correctamente')
        }).catch(error => {
          console.log(error)
        })
        Swal.fire(
          'Eliminado!',
          'El Usuario ha sido borrada correctamente.',
          'success'
        )
      }
    })


  }

  //metodo que retorna todos los datos de los usuarios y se almacenan en un arreglo
  getUsuarios() {
    this._usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = [];
      data.forEach((element: any) => {
        this.usuarios.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })

      });
      // console.log(this.usuarios)
    })
  }
}
