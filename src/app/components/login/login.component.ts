import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginUsuario: FormGroup;


  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService
  ) {
    this.loginUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void { }

  //metodo para validar el login con los datos del formulario

  login() {
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;

    this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
      //validamos si el correo ya fue verificado
      if (user.user?.emailVerified) {
        this.router.navigate(['/list-I']);
      } else {
        this.router.navigate(['/verificar-correo']);
      }
    }).catch((error) => {

      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: this.firebaseError.codeError(error.code),
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
}
