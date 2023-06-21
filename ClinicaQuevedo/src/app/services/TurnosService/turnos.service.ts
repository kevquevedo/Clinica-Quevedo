import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
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
      estado: estado,
    })
  }

  actualizarEncuestaTurno(turno: any, estadoEncuesta:boolean){
    let turnoRef = doc(this.firestore, 'turnos', turno.id);
    updateDoc(turnoRef, {
      encuesta: estadoEncuesta
    })
  }

  actualizarReseniaTurno(turno:any, resenia:string){
    let turnoRef = doc(this.firestore, 'turnos', turno.id);
    updateDoc(turnoRef, {
      resenia: resenia
    })
  }

  actualizarComentarioTurno(turno:any, comentario:string){
    let turnoRef = doc(this.firestore, 'turnos', turno.id);
    updateDoc(turnoRef, {
      comentarioPac: comentario
    })
  }

  actualizarAtencionTurno(turno: any, comentario:string){
    let turnoRef = doc(this.firestore, 'turnos', turno.id);
    updateDoc(turnoRef, {
      comentarioPac: comentario
    })
  }

  crearTurno(especialista:any, especialidad:any, fecha:any, hora:any, paciente:any){
    let turno = {
      "especialista":especialista,
      "especialidad":especialidad.nombre,
      "encuesta":false,
      "estado":'pendiente',
      "comentarioPac": '',
      "fecha":fecha,
      "paciente":paciente,
      "resenia":'',
      "hora":hora,
    }
    let turnosRef = collection(this.firestore, 'turnos');
    addDoc(turnosRef, turno);
  }


}
