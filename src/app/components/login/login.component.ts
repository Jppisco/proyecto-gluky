import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';
import { UserService } from 'src/app/services/user.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginUsuario: FormGroup;
  loading: boolean = false;


  constructor(

    private fb: FormBuilder,
    private firebaseError: FirebaseCodeErrorService,
    private userService: UsuarioService,
    private user: UserService

  ) {

    this.loginUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })

  }

  ngOnInit(): void { }
  loginGoogle() {
    this.userService.loginGoogle()
  }
  login() {
    if (
      this.loginUsuario.value.email == '' ||
      this.loginUsuario.value.password == ''
    )
      return window.alert('Ingrese credenciales');
    this.loading = true;

    this.user
      .SignIn(
        this.loginUsuario.value.email,
        this.loginUsuario.value.password
      )
      .catch((error) => {
        this.loading = false;
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: this.firebaseError.codeError(error.code),
          showConfirmButton: false,
          timer: 1500
        })
      })
  };

}
