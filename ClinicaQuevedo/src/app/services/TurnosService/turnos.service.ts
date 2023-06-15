import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  listaTurnos! : any;

  constructor(
    private firestore: Firestore
  ) {
    this.obtenerTurnos().subscribe( respuesta => {
      this.listaTurnos = respuesta;
    })
  }

  obtenerTurnos(): Observable<[]>{
    const turnos = collection(this.firestore, 'turnos')
    return collectionData(turnos, {idField:'id'}) as Observable<[]>
  }

  actualizarEstadoTurno(turno: any, estado:string) {
    let turnoRef = doc(this.firestore, 'turnos', turno.id);
    updateDoc(turnoRef, {
      estado: estado
    })
  }

  actualizarEncuestaTurno(turno: any, estadoEncuesta:boolean){
    let turnoRef = doc(this.firestore, 'turnos', turno.id);
    updateDoc(turnoRef, {
      encuesta: estadoEncuesta
    })
  }

  actualizarAtencionTurno(turno: any, comentario:string){
    let turnoRef = doc(this.firestore, 'turnos', turno.id);
    updateDoc(turnoRef, {
      comentarioPac: comentario
    })
  }


}
