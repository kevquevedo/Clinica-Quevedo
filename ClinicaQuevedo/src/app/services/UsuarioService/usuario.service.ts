import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public estado: boolean = false;
  public usuarioRegistrado: string | undefined;
  private emailLogueado: Subject<string>;
  public emailLogueado$: Observable<string>;

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {
    this.emailLogueado = new Subject();
    this.emailLogueado$ = this.emailLogueado.asObservable();
  }

  loguearUsuario(email:string){
    this.estado = true;
    this.usuarioRegistrado = email;
    this.emailLogueado.next(email);
  }

  logOut(){
    this.estado = false;
    this.usuarioRegistrado = undefined;
    this.emailLogueado.next('')
    this.auth.signOut();
  }

  actualizarUsuariosPaciente(nombre:string, apellido:string, edad:string, dni:string, obrasocial:string, email:string, clave:string, imgs:any, rol:string){

    console.log(imgs);
    let imagenes = {
      "img1": imgs[0],
      "img2": imgs[1],
    }
    console.log(imagenes);
    let usuarioNuevo = {
      "nombre":nombre,
      "apellido":apellido,
      "edad":edad,
      "dni":dni,
      "obrasocial":obrasocial,
      "email":email,
      "clave":clave,
      "imgs":imagenes,
      "rol":rol
    }
    // let usuariosRef = collection(this.firestore, 'usuarios');
    // addDoc(usuariosRef, usuarioNuevo);
  }

}
