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


  ngOnInit(): void {
    this.getUsuarios()


  }

  constructor(
    private _usuarioService: UsuarioService,
    private router: Router,
    private aRoute: ActivatedRoute,
  ) {
    this.id_instancia = this.aRoute.snapshot.paramMap.get('id_instancia');
    console.log(this.id_instancia)
  }
  // getUsuariosBy(id_instancia: string) {
  //   this._usuarioService.getUsuariosBy(id_instancia).subscribe(data => {
  //     this.usuarios = [];
  //     data.forEach((element: any) => {
  //       console.log(element.payload.doc.id)

  //       this.usuarios.push({
  //         id_instancia: element.payload.doc.id_instancia,
  //         ...element.payload.doc.data()
  //       })

  //     });
  //     console.log(this.usuarios)
  //   })
  //   console.log('este es el id por BY', id_instancia)

  // }
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
  getUsuarios() {
    this._usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = [];
      data.forEach((element: any) => {
        this.usuarios.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })

      });
      console.log(this.usuarios)
    })
  }
}
