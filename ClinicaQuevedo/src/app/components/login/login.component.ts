import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  mensajeError: string | undefined;
  spinner! : boolean;
  loading! : boolean;

  constructor(
    private auth: Auth,
    private router: Router,
    private uServ: UsuarioService
  ) {
    this.spinner = false;
    this.loading = true;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      mail: new FormControl('', Validators.email),
      clave: new FormControl('', Validators.minLength(6)),
    });
    setTimeout(() =>{ this.loading= false; }, 1000)
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
      this.spinner= false;
      // this.uServ.actualizarLogUsuarios(respuesta.user.email!);
      this.uServ.loguearUsuario(respuesta.user.email!);
      this.router.navigateByUrl('');
    })
    .catch(error => {
      this.evaluarErrorLogin(error.code);
    })
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



}
