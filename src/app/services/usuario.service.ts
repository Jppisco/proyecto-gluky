import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  dataUser: any;

  constructor(private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,) {

  }

  //hacemos una metodo para almacenar los datos en la collecion
  agregarUsuarios(instancia: any): Promise<any> {
    return this.firestore.collection('usuarios').add(instancia);
  }

  //hacemos una consulta a la base de datos y ordenamos por fecha de creacion
  getUsuarios(): Observable<any> {
    return this.firestore.collection('usuarios', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }
  //hacemos una metodo recibe el id lo valida y lo elimina
  eliminarUsuario(id: string): Promise<any> {
    return this.firestore.collection('usuarios').doc(id).delete();
  }
  //hacemos un metodo que actualiza usuarios por el id y recibe la info en data
  actualizarUsuario(id: string, data: any): Promise<any> {
    return this.firestore.collection("usuarios").doc(id).update(data);
  }

  //hacemos un metodo que nos va a retornar todos los datos dependiendo el id
  getUsuario(id: string): Observable<any> {
    return this.firestore.collection('usuarios').doc(id).snapshotChanges();
  }

  //metodo que hace la consulta
  getUsuariosBy(id_instancia: string): Observable<any> {
    return this.firestore.collection('usuarios', ref => ref.where('id_instancia', '==', id_instancia)).snapshotChanges();
  }

  logout() {
    this.afAuth.currentUser.then(user => {
      if (user && user.emailVerified) {
        this.dataUser = user;
        console.log(user)
      } else {
        this.router.navigate(['/login']);
      }
    })
  }

}
