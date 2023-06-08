import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';
import { Storage, ref } from '@angular/fire/storage';
import { getDownloadURL, uploadBytes } from 'firebase/storage';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  loading! : boolean;
  paciente! : boolean;
  especialista! : boolean;
  form!: FormGroup;
  mensajeError: string | undefined;
  cantidadImgs! : boolean;
  imagenesAux! : Array<any>;
  urlsPac = {"url1":'', "url2":""}

  constructor(
    private auth : Auth,
    private router: Router,
    private uServ : UsuarioService,
    private storage: Storage
  ) {
    this.loading = true;
    this.paciente = false;
    this.especialista = false;
    this.cantidadImgs = false;
    this.imagenesAux = new Array<any>();
  }

  ngOnInit(): void {
    setTimeout(() =>{ this.loading= false; }, 1000)
  }

  seguirPaciente(){
    this.paciente = true;
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.pattern('^[a-zA-Z]+$'),Validators.required]),
      apellido: new FormControl('', [Validators.pattern('^[a-zA-Z]+$'),Validators.required]),
      edad: new FormControl('', [Validators.required, Validators.minLength(18), Validators.maxLength(99)] ),
      obrasocial: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.pattern('^[0-9]{8}$'),Validators.required]),
      mail: new FormControl('', [Validators.email,Validators.required]),
      clave: new FormControl('', [Validators.minLength(6),Validators.required]),
      reingresoClave: new FormControl('', [Validators.minLength(6),Validators.required]),
    });
  }

  get nombre(){
    return this.form.get('nombre');
  }
  get apellido(){
    return this.form.get('apellido');
  }
  get edad(){
    return this.form.get('edad');
  }
  get dni(){
    return this.form.get('dni');
  }
  get obrasocial(){
    return this.form.get('obrasocial');
  }
  get mail(){
    return this.form.get('mail');
  }
  get clave(){
    return this.form.get('clave');
  }
  get reingresoClave(){
    return this.form.get('reingresoClave');
  }

  evaluarErrorInputsPaciente(){
    if(!this.nombre?.valid){
      this.mensajeError = "El campo 'Nombre' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(!this.apellido?.valid){
      this.mensajeError = "El campo 'Apellido' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(!this.edad?.valid){
      this.mensajeError = "El campo 'Edad' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(!this.dni?.valid){
      this.mensajeError = "El campo 'DNI' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(!this.obrasocial?.valid){
      this.mensajeError = "El campo 'Obra Social' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(!this.mail?.valid){
      this.mensajeError = "El campo 'Email' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(!this.clave?.valid){
      this.mensajeError = "El campo 'Contraseña' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(!this.reingresoClave?.valid){
      this.mensajeError = "El campo 'Reingrese Contraseña' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(this.clave?.value != this.reingresoClave?.value){
      this.mensajeError = "Las contraseñas deben coincidir."
      this.ocultarMensaje();
      return false;
    }
    else if(this.cantidadImgs == false){
      this.mensajeError = "Debe seleccionar dos imagenes."
      this.ocultarMensaje();
      return false;
    }
    return true;
  }

  verImagenes(event:any){
    this.cantidadImgs = false;
    let cantidad = event.target.files.length
    if(cantidad == 2){
      this.cantidadImgs = true;
      this.imagenesAux.push(event.target.files[0].name);
      this.imagenesAux.push(event.target.files[1].name);
    }
  }



 subirImagenesPaciente(imagenes: any){


    let img1 = imagenes[0];
    let imgRef = ref(this.storage, `${img1}`);
    uploadBytes(imgRef, img1)
    .then(()=>{
      getDownloadURL(imgRef)
      .then( url => {
        this.urlsPac.url1 = url
      });
    })
    .catch( error => {
      console.log(error)
    })

    let img2 = imagenes[1];
    let imgRef2 = ref(this.storage, `${img2}`);
    uploadBytes(imgRef2, img2)
    .then(()=>{
      getDownloadURL(imgRef2)
      .then( url => {
        this.urlsPac.url2 = url;
      });
    })
    .catch( error => {
      console.log(error)
    })
  }

  crearPaciente(){
    if(this.evaluarErrorInputsPaciente()){
      createUserWithEmailAndPassword(this.auth, this.mail?.value, this.clave?.value)
      .then( respuesta => {

        this.subirImagenesPaciente(this.imagenesAux);

        console.log(this.urlsPac)
        this.uServ.actualizarUsuariosPaciente(
          this.nombre?.value, this.apellido?.value, this.edad?.value, this.dni?.value,
          this.obrasocial?.value, this.mail?.value, this.clave?.value, this.urlsPac, 'paciente');
        this.uServ.loguearUsuario(this.mail?.value);
        this.router.navigateByUrl('');
      })
      .catch(error => {
        console.log(error)
        this.evaluarErrorCWEAP(error.code);
      })
    }
  }
















  //ESPECIALISTA

  seguirEspecialista(){
    this.especialista = true;
  }

  evaluarErrorCWEAP(error:string){
    switch(error){
      case 'auth/email-already-in-use':
        this.mensajeError = "El email ya se encuentra registrado."
        this.ocultarMensaje();
      break;
      case 'auth/weak-password':
        this.mensajeError = "La contraseña es muy débil. Debe contener al menos 6 caracteres."
        this.ocultarMensaje();
      break;
      default:
        console.log(error)
        this.mensajeError = "Ocurrió un error inesperado."
        this.ocultarMensaje();
      break;
    }
  }

  ocultarMensaje(){
    setTimeout(() =>{ this.mensajeError = undefined },3000)
  }
}
