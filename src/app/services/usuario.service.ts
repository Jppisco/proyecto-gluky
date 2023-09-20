import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GoogleAuthProvider } from '@firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  dataUser: any;

  constructor(private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,) {

  }

  loginGoogle() {
    return this.authLogin(new GoogleAuthProvider())
  }
  authLogin(provider: any) {
    this.afAuth.signInWithPopup(provider).then(result => {
      console.log(result)
      this.router.navigate(['/list-I']);
    }).catch(error => console.log(error))
  }

  //hacemos una metodo para almacenar los datos en la collecion
  async agregarUsuarios(instancia: any): Promise<any> {
    await this.firestore.collection('usuarios').add(instancia);
  }


  //hacemos una consulta a la base de datos y ordenamos por fecha de creacion
  getUsuarios(): Observable<any> {
    return this.firestore.collection('usuarios', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }
  //hacemos una metodo recibe el id lo valida y lo elimina
  async eliminarUsuario(id: string): Promise<any> {
    await this.firestore.collection('usuarios').doc(id).delete();
  }
  //hacemos un metodo que actualiza usuarios por el id y recibe la info en data
  async actualizarUsuario(id: string, data: any): Promise<any> {
    await this.firestore.collection("usuarios").doc(id).update(data);
  }

  //hacemos un metodo que nos va a retornar todos los datos dependiendo el id
  getUsuario(id: string): Observable<any> {
    return this.firestore.collection('usuarios').doc(id).snapshotChanges();
  }

  //metodo que hace la consulta
  getUsuariosBy(id_programa: string): Observable<any> {
    return this.firestore.collection('usuarios', ref => ref.where('id_programa', '==', id_programa)).snapshotChanges();
  }
 

}
