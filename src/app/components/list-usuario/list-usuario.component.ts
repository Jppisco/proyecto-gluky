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
  id_instancia: string | null;
  usuarios: any[] = [];
  usuario: any[] = [];


  ngOnInit(): void {
    this._usuarioService.logout()
    this.getusu();
    this.getUsuarios()


  }

  constructor(
    private _usuarioService: UsuarioService,
    private aRoute: ActivatedRoute,
  ) {
    this.id_instancia = this.aRoute.snapshot.paramMap.get('id_instancia');
    console.log(this.id_instancia)
  }

  getusu() {
    if (this.id_instancia !== null) {
      return this.getUsuarioId(this.id_instancia)
    }
  }
  getUsuarioId(id_instancia: string) {
    this._usuarioService.getUsuariosBy(id_instancia).subscribe(data => {
      this.usuario = [];
      data.forEach((element: any) => {
        this.usuario.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })

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
