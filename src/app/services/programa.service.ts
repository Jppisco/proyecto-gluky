import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  constructor(private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,) { }
  //hacemos una metodo para almacenar los datos en la collecion
  async agregarProgramas(programa: any): Promise<any> {
    await this.firestore.collection('programas').add(programa);
  }
  //hacemos una consulta a la base de datos y ordenamos por fecha de creacion
  getProgramas(): Observable<any> {
    return this.firestore.collection('programas', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }
  //metodo que hace la consulta
  getProgramasBy(id_instancia: string): Observable<any> {
    return this.firestore.collection('programas', ref => ref.where('id_instancia', '==', id_instancia)).snapshotChanges();
  }
  //hacemos una metodo recibe el id lo valida y lo elimina
  async eliminarPrograma(id: string): Promise<any> {
    await this.firestore.collection('programas').doc(id).delete();
  }
  //hacemos un metodo que actualiza usuarios por el id y recibe la info en data
  async actualizarPrograma(id: string, data: any): Promise<any> {
    await this.firestore.collection("programas").doc(id).update(data);
  }
  //hacemos un metodo que nos va a retornar todos los datos dependiendo el id
  getPrograma(id: string): Observable<any> {
    return this.firestore.collection('programas').doc(id).snapshotChanges();
  }

}
