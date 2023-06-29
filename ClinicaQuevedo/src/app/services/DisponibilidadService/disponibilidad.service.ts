import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisponibilidadService {

  constructor(
    private firestore: Firestore
  ) { }

  crearDisponibilidad(email:string, especialidad:string){
    let disponibilidad = {
      email: email,
      especialidad: especialidad,
      lunes: {dia: "lunes", horaDesde:"08:00 AM", horaHasta: "07:00 PM", laborable:true},
      martes: {dia: "martes", horaDesde:"08:00 AM", horaHasta: "07:00 PM", laborable:true},
      miercoles: {dia: "miercoles", horaDesde:"08:00 AM", horaHasta: "07:00 PM", laborable:true},
      jueves: {dia: "jueves", horaDesde:"08:00 AM", horaHasta: "07:00 PM", laborable:true},
      viernes: {dia: "viernes", horaDesde:"08:00 AM", horaHasta: "07:00 PM", laborable:true},
      sabado: {dia: "sabado", horaDesde:"08:00 AM", horaHasta: "02:00 PM", laborable:true}
    }
  }

  obtenerDisponibilidades(): Observable<[]>{
    const disponibilidades = collection(this.firestore, 'disponibilidad')
    return collectionData(disponibilidades, {idField:'id'}) as Observable<[]>
  }

  actualizarEstadoDia(dia: any, id:string, estado:boolean) {

    let diaRef = doc(this.firestore, 'disponibilidad', id);
    switch(dia.dia){
      case 'lunes':
        updateDoc(diaRef, { lunes : { laborable: estado, dia: dia.dia, horaDesde: dia.horaDesde, horaHasta: dia.horaHasta} })
        break;
      case 'martes':
        updateDoc(diaRef, { martes : { laborable: estado, dia: dia.dia, horaDesde: dia.horaDesde, horaHasta: dia.horaHasta} })
        break;
      case 'miercoles':
        updateDoc(diaRef, { miercoles : { laborable: estado, dia: dia.dia, horaDesde: dia.horaDesde, horaHasta: dia.horaHasta} })
        break;
      case 'jueves':
        updateDoc(diaRef, { jueves : { laborable: estado, dia: dia.dia, horaDesde: dia.horaDesde, horaHasta: dia.horaHasta} })
        break;
      case 'viernes':
        updateDoc(diaRef, { viernes : { laborable: estado, dia: dia.dia, horaDesde: dia.horaDesde, horaHasta: dia.horaHasta} })
        break;
      case 'sabado':
        updateDoc(diaRef, { sabado : { laborable: estado, dia: dia.dia, horaDesde: dia.horaDesde, horaHasta: dia.horaHasta} })
        break;
      default:
        break;
    }
  }

  actualizarHora(dia: any, id:string, horaDesde:string, horaHasta:string){
    let diaRef = doc(this.firestore, 'disponibilidad', id);
    switch(dia.dia){
      case 'lunes':
        updateDoc(diaRef, { lunes : { laborable: dia.laborable, dia: dia.dia, horaDesde: horaDesde, horaHasta: horaHasta} })
        break;
      case 'martes':
        updateDoc(diaRef, { martes : { laborable: dia.laborable, dia: dia.dia, horaDesde: horaDesde, horaHasta: horaHasta} })
        break;
      case 'miercoles':
        updateDoc(diaRef, { miercoles : { laborable: dia.laborable, dia: dia.dia, horaDesde: horaDesde, horaHasta: horaHasta} })
        break;
      case 'jueves':
        updateDoc(diaRef, { jueves : { laborable: dia.laborable, dia: dia.dia, horaDesde: horaDesde, horaHasta: horaHasta} })
        break;
      case 'viernes':
        updateDoc(diaRef, { viernes : { laborable: dia.laborable, dia: dia.dia, horaDesde: horaDesde, horaHasta: horaHasta} })
        break;
      case 'sabado':
        updateDoc(diaRef, { sabado : { laborable: dia.laborable, dia: dia.dia, horaDesde: horaDesde, horaHasta: horaHasta} })
        break;
      default:
        break;
    }
  }
}
