import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  constructor(
    private firestore: Firestore
  ) { }

  obtenerEspecialidades(): Observable<[]>{
    const especialidades = collection(this.firestore, 'especialidades')
    return collectionData(especialidades, {idField:'id'}) as Observable<[]>
  }
}
