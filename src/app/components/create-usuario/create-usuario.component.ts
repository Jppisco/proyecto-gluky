import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.css']
})
export class CreateUsuarioComponent implements OnInit {
  createUsuario: FormGroup;
  id_instancia: string | null;
  id: string | null;
  titulo = 'Agregar Usuario';
  ngOnInit(): void {
    this.esEditar()
  }
  constructor(private router: Router,
    private aRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
  ) {

    this.createUsuario = this.fb.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required],
    })
    this.id_instancia = this.aRoute.snapshot.paramMap.get('id_instancia');
    console.log(this.id_instancia)
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }
  agregarEditarUsuarios() {

    if (this.id === null) {
      return this.agregarUsuarios();
    } else {
      return this.editarUsuarios(this.id);
    }
  }



  //funcion para agregar usuarios
  agregarUsuarios() {
    //definimos un objeto con todos los atributos del formulario
    const usuarios: any = {
      id_instancia: this.id_instancia,
      usuario: this.createUsuario.value.usuario,
      clave: this.createUsuario.value.clave,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    //hacemos llamado a la funcion que hay en el servicio y almacenamos un firebase
    this._usuarioService.agregarUsuarios(usuarios).then(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Usuario registrado con exito',
        showConfirmButton: false,
        timer: 1500
      })
      console.log('Usuario registrado con exito');
      this.router.navigate(['/list-U'])
    }).catch(error => {
      console.log(error)
    })
  }

  //funcion para editar instancias
  editarUsuarios(id: string) {
    //definimos un objeto con todos los atributos del formulario
    const usuarios: any = {
      id_instancia: this.id_instancia,
      usuario: this.createUsuario.value.usuario,
      clave: this.createUsuario.value.clave,
      fechaActualizacion: new Date()
    }
    this._usuarioService.actualizarUsuario(id, usuarios).then(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Usuario Actualizada con exito',
        showConfirmButton: false,
        timer: 1500
      })
      console.log("Usuario Actualizada");
      this.router.navigate(['/list-I'])
    }).catch(error => {
      console.log(error)
    })
  }

  //rellenamos el HTML con el set value y con lo que retorna el metodo de la instancia
  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Usuario';
      this._usuarioService.getUsuario(this.id).subscribe(data => {
        console.log(data)
        console.log(data.payload.data()['id_instancia']);
        this.createUsuario.setValue({
          usuario: data.payload.data()['usuario'],
          clave: data.payload.data()['clave'],
        })

      })
    }
  }

}
