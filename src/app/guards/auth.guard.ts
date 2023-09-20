import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Llama al método isAuthenticated() del servicio de autenticación
    // para verificar si el usuario está autenticado y tiene el correo verificado.
    return this.afAuth.currentUser.then((user) => {
      if (user && user.emailVerified) {
        // Si el usuario está autenticado y su correo está verificado, retorna true
        return true;
      } else {
        // Si no cumple con las condiciones, redirige al usuario a la página de inicio de sesión
        this.router.navigate(['/login']);
        return false;
      }
    });
  }
}
