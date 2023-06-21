import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoriasService {

  constructor(
    private firestore: Firestore
  ) { }

  obtenerHistorias(): Observable<[]>{
    const historias = collection(this.firestore, 'historias')
    return collectionData(historias, {idField:'id'}) as Observable<[]>
  }

  crearHistoria(turno:any, altura:any, peso:any, temperatura:any, presion:any, comentario:any, clave1:any , clave2:any , clave3:any, valor1:any , valor2:any , valor3:any){
    let historia = {
      "turno":turno,
      "altura":altura,
      "peso":peso,
      "temperatura":temperatura,
      "presion": presion,
      "comentario":comentario,
      "clave1":clave1,
      "clave2":clave2,
      "clave3":clave3,
      "valor1":valor1,
      "valor2":valor2,
      "valor3":valor3,
    }
    let historiasRef = collection(this.firestore, 'historias');
    addDoc(historiasRef, historia);
  }

}
