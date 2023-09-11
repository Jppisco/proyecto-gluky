import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstanciaService {

  constructor(private firestore: AngularFirestore) {

  }

  //hacemos una metodo para almacenar los datos en la collecion
  agregarInstancia(instancia: any): Promise<any> {
    return this.firestore.collection('instancias').add(instancia);
  }

  //hacemos una consulta a la base de datos y ordenamos por fecha de creacion
  getInstancias(): Observable<any> {
    return this.firestore.collection('instancias', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  //hacemos una metodo recibe el id lo valida y lo elimina
  eliminarInstancia(id: string): Promise<any> {
    return this.firestore.collection('instancias').doc(id).delete();
  }

  //hacemos un metodo que nos va a retornar todos los datos dependiendo el id
  getInstancia(id: string): Observable<any> {
    return this.firestore.collection('instancias').doc(id).snapshotChanges();
  }
  //hacemos un metodo que va actualizar una instancia por el id
  actualizarInstancia(id: string, data: any): Promise<any> {
    return this.firestore.collection("instancias").doc(id).update(data);
  }

}
