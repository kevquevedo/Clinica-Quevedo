import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, getAuth, sendEmailVerification, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, flatMap } from 'rxjs';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  mensajeError: string | undefined;
  spinner! : boolean;
  loading! : boolean;
  usuariosAccesos! : any[];
  subsUsuario!: Subscription;
  listadoUsers! : any;

  constructor(
    private auth: Auth,
    private router: Router,
    private uServ: UsuarioService
  ) {
    this.spinner = false;
    this.loading = true;
  }

  ngOnInit(): void {
    this.cargarBotones();
    this.uServ.obtenerUsuarios().subscribe(respuesta => {
      this.listadoUsers = respuesta;
    })
    this.form = new FormGroup({
      mail: new FormControl('', Validators.email),
      clave: new FormControl('', Validators.minLength(6)),
    });
    setTimeout(() =>{ this.loading= false; }, 1000)
  }

  ngOnDestroy(): void{
    this.subsUsuario.unsubscribe();
  }

  cargarBotones(){
    let veces = 0;
    this.usuariosAccesos = new Array<any>();
    this.subsUsuario = this.uServ.obtenerUsuarios().subscribe(respuesta =>{
      if(veces == 0){
        veces++;
        respuesta.forEach(usuario => {
          if((usuario as any).email == 'a.fernandez@clinica.com' ||
             (usuario as any).email == 'g.gutierrez@clinica.com' ||
             (usuario as any).email == 'p.perez@clinica.com' ||
             (usuario as any).email == 'pijebof307@onlcool.com' ||
             (usuario as any).email == 'r.ramirez@clinica.com' ||
             (usuario as any).email == 'quevedo.kevin1994@gmail.com' ){

            let imagen;
            if((usuario as any).rol == 'paciente'){
              imagen = (usuario as any).imgs.url1;
            }else{
              imagen = (usuario as any).img;
            }
            let user = {"nombre":(usuario as any).nombre, "apellido":(usuario as any).apellido, "email":(usuario as any).email, "clave":(usuario as any).clave, "img":imagen, "rol":(usuario as any).rol}
            this.usuariosAccesos.push(user);
          }
        })
        this.usuariosAccesos.sort(this.ordenarPorRol);
      }
    })
  }

  get mail(){
    return this.form.get('mail');
  }
  get clave(){
    return this.form.get('clave');
  }

  loguearUsuario(){
    this.spinner= true;
    signInWithEmailAndPassword(this.auth, this.mail?.value, this.clave?.value)
    .then(respuesta => {

      let auth = getAuth();
      if(auth.currentUser?.emailVerified == true){

        let aviso = false;
        this.listadoUsers.forEach((usuario: any) => {
          if((usuario as any).email == auth.currentUser?.email){
            if((usuario as any).rol == 'especialista' && (usuario as any).estado == false){
              aviso = true;
            }
          }
        });

        if(aviso){
          this.auth.signOut();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Un ADMIN debe validar su cuenta.',
            showConfirmButton: false,
            timer: 2000
          })
        }else{
          this.uServ.loguearUsuario(respuesta.user.email!);
          this.router.navigateByUrl('');
        }

      }else{
        this.auth.signOut();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Debe validar la cuenta mediante el correo electrónico.',
          showConfirmButton: false,
          timer: 2000
        })
        this.limpiarInputs()
      }

    })
    .catch(error => {
      this.evaluarErrorLogin(error.code);
    })
    .finally( () => {
      this.spinner= false;
    })
  }

  log(email: string){

    switch(email){
      case 'a.fernandez@clinica.com':
        this.obtenerDatosUsuario(email);
        setTimeout(() =>{ this.loguearUsuario() }, 2000)
      break;

      case 'g.gutierrez@clinica.com':
        this.obtenerDatosUsuario(email);
        setTimeout(() =>{ this.loguearUsuario() }, 2000)
      break;

      case 'p.perez@clinica.com':
        this.obtenerDatosUsuario(email);
        setTimeout(() =>{ this.loguearUsuario() }, 2000)
      break;

      case 'pijebof307@onlcool.com':
        this.obtenerDatosUsuario(email);
        setTimeout(() =>{ this.loguearUsuario() }, 2000)
      break;

      case 'r.ramirez@clinica.com':
        this.obtenerDatosUsuario(email);
        setTimeout(() =>{ this.loguearUsuario() }, 2000)
      break;

      case 'quevedo.kevin1994@gmail.com':
        this.obtenerDatosUsuario(email);
        setTimeout(() =>{ this.loguearUsuario() }, 2000)
      break;

      default:
        this.limpiarInputs();
      break;
    }

  }

  obtenerDatosUsuario(email: string){
    this.spinner= true;
    this.uServ.obtenerUsuarios().subscribe(respuesta =>{
      this.spinner= false;
      respuesta.forEach(usuario => {
        if((usuario as any).email == email){
          this.form.controls['mail'].setValue((usuario as any).email);
          this.form.controls['clave'].setValue((usuario as any).clave);
        }
      })
    })
  }

  ordenarPorRol(user1: any, user2: any) {
    if(user1.rol < user2.rol){
      return -1;
    }else if(user1.rol > user2.rol){
      return 1;
    }
    return 0;
  }

  evaluarErrorLogin(error : string){
    switch(error){
      case 'auth/user-not-found':
        this.mensajeError = "El email no se encuentra registrado."
        this.ocultarMensaje();
      break;
      case 'auth/invalid-email':
        this.mensajeError = "El email ingresado es incorrecto."
        this.ocultarMensaje();
      break;
      case 'auth/wrong-password':
        this.mensajeError = "La contraseña es incorrecta."
        this.ocultarMensaje();
      break;
      case 'auth/missing-password':
        this.mensajeError = "Debe ingresar una contraseña."
        this.ocultarMensaje();
      break;
      default:
        this.mensajeError = "Ocurrió un error inesperado.";
        this.ocultarMensaje();
      break;
    }
  }

  ocultarMensaje(){
    setTimeout(() =>{ this.mensajeError = undefined },3000)
  }

  limpiarInputs(){
    this.form.controls['mail'].setValue('');
    this.form.controls['clave'].setValue('');
  }

}
