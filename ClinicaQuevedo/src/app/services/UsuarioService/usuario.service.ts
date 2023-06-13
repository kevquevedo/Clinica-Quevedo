import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public estado: boolean = false;
  public usuarioRegistrado: string | undefined;
  public rol: string | undefined;
  private emailLogueado: Subject<string>;
  public emailLogueado$: Observable<string>;
  private listUsuarios! : any;

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {
    this.emailLogueado = new Subject();
    this.emailLogueado$ = this.emailLogueado.asObservable();
    this.obtenerUsuarios().subscribe(respuesta=>{
      this.listUsuarios = respuesta;
    })
  }

  loguearUsuario(email:string){

    this.estado = true;
    this.usuarioRegistrado = email;
    this.listUsuarios.forEach((element: any) => {
      if((element as any).email == email){
        this.rol = (element as any).rol;
      }
    });
    this.emailLogueado.next(email);
  }

  logOut(){
    this.estado = false;
    this.usuarioRegistrado = undefined;
    this.rol = undefined;
    this.emailLogueado.next('')
    this.auth.signOut();
  }

  actualizarUsuariosPaciente(nombre:string, apellido:string, edad:string, dni:string, obrasocial:string, email:string, clave:string, imgs:any, rol:string){

    let usuarioNuevo = {
      "nombre":nombre,
      "apellido":apellido,
      "edad":edad,
      "dni":dni,
      "obrasocial":obrasocial,
      "email":email,
      "clave":clave,
      "imgs":imgs,
      "rol":rol
    }
    let usuariosRef = collection(this.firestore, 'usuarios');
    addDoc(usuariosRef, usuarioNuevo);
  }

  actualizarUsuariosEspecialista(nombre:string, apellido:string, edad:string, dni:string, especialidad:string, email:string, clave:string, img:string, rol:string){

    let usuarioNuevo = {
      "nombre":nombre,
      "apellido":apellido,
      "edad":edad,
      "dni":dni,
      "especialidad":especialidad,
      "email":email,
      "clave":clave,
      "img":img,
      "rol":rol,
      "estado":false
    }
    let usuariosRef = collection(this.firestore, 'usuarios');
    addDoc(usuariosRef, usuarioNuevo);
  }

  actualizarUsuariosAdmin(nombre:string, apellido:string, edad:string, dni:string, email:string, clave:string, img:string, rol:string){

    let usuarioNuevo = {
      "nombre":nombre,
      "apellido":apellido,
      "edad":edad,
      "dni":dni,
      "email":email,
      "clave":clave,
      "img":img,
      "rol":rol,
    }
    let usuariosRef = collection(this.firestore, 'usuarios');
    addDoc(usuariosRef, usuarioNuevo);
  }

  obtenerUsuarios(): Observable<[]>{
    const usuarios = collection(this.firestore, 'usuarios')
    return collectionData(usuarios, {idField:'id'}) as Observable<[]>
  }

  actualizarEspecialista(usuario: any, estado:boolean) {
    let userRef = doc(this.firestore, 'usuarios', usuario.id);
    updateDoc(userRef, {
      estado: estado
    })
  }
}
