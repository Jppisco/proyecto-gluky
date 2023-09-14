import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { InstanciaService } from 'src/app/services/instancia.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-instancia',
  templateUrl: './list-instancia.component.html',
  styleUrls: ['./list-instancia.component.css']
})
export class ListInstanciaComponent implements OnInit {
  instancias: any[] = [];
  i: any;

  dataUser: any;

  ngOnInit(): void {
    // this._usuarioService.logout()
    //al iniciar el componente va a ejecutar la funcion
    this.getInstancias();
  }
  constructor(
    private _instanciaService: InstanciaService,
    private _usuarioService: UsuarioService,
    private afAuth: AngularFireAuth,
    private router: Router,

  ) { }


  //hacemos una funcion que no trae una la consulta de todas las intancias
  async getInstancias() {
    await this._instanciaService.getInstancias().subscribe(data => {
      this.instancias = data.map((element: any) => {
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

      console.log(this.instancias);
    });
  }

  //metodo para eliminar instancias recibiendo el id

  eliminarInstancia(id: string) {
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
        this._instanciaService.eliminarInstancia(id).then(() => {
          console.log(id);
          console.log('instancia eliminada correctamente')
        }).catch(error => {
          console.log(error)
        })
        Swal.fire(
          'Eliminado!',
          'La instancia ha sido borrada correctamente.',
          'success'
        )
      }
    })


  }
  //cerrar sesion por angularfireauth
  logOut() {
    this.afAuth.signOut().then(() => this.router.navigate(['/login']));
  }

}
