import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private firestore: AngularFirestore) { }

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
  actualizarUsuario(id: string, data: any): Promise<any> {
    return this.firestore.collection("usuarios").doc(id).update(data);
  }

  //hacemos un metodo que nos va a retornar todos los datos dependiendo el id
  getUsuario(id: string): Observable<any> {
    return this.firestore.collection('usuarios').doc(id).snapshotChanges();
  }

  getUsuariosBy(id_instancia: string): Observable<any> {
    return this.firestore.collection('usuarios', ref => ref.where(id_instancia, '==', 'id_instancia')).valueChanges();
  }

}
