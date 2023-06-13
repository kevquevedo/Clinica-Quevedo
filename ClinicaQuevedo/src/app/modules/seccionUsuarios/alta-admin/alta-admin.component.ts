import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Storage, ref } from '@angular/fire/storage';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';

@Component({
  selector: 'app-alta-admin',
  templateUrl: './alta-admin.component.html',
  styleUrls: ['./alta-admin.component.css']
})
export class AltaAdminComponent implements OnInit {

  loading! : boolean;
  spinner! : boolean;
  admin! : boolean;
  formAdm!: FormGroup;
  mensajeError: string | undefined;
  imagenAdm! : any
  urlAdm! : any;

  constructor(
    private auth : Auth,
    private router: Router,
    private uServ : UsuarioService,
    private storage: Storage
  ) {
    this.loading = true;
    this.spinner = false;
    this.admin = false;
  }

  ngOnInit(): void {
    this.admin = true;
    this.formAdm = new FormGroup({
      nombre: new FormControl('', [Validators.pattern('^[a-zA-Z]+$'),Validators.required]),
      apellido: new FormControl('', [Validators.pattern('^[a-zA-Z]+$'),Validators.required]),
      edad: new FormControl('', [Validators.required, Validators.minLength(18), Validators.maxLength(99)] ),
      dni: new FormControl('', [Validators.pattern('^[0-9]{8}$'),Validators.required]),
      mail: new FormControl('', [Validators.email,Validators.required]),
      clave: new FormControl('', [Validators.minLength(6),Validators.required]),
      reingresoClave: new FormControl('', [Validators.minLength(6),Validators.required]),
    });
    setTimeout(() =>{ this.loading= false; }, 1000)
  }
  get nombre(){
    return this.formAdm.get('nombre');
  }
  get apellido(){
    return this.formAdm.get('apellido');
  }
  get edad(){
    return this.formAdm.get('edad');
  }
  get dni(){
    return this.formAdm.get('dni');
  }
  get mail(){
    return this.formAdm.get('mail');
  }
  get clave(){
    return this.formAdm.get('clave');
  }
  get reingresoClave(){
    return this.formAdm.get('reingresoClave');
  }
  evaluarErrorInputsAdmin(){
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
    else if(this.imagenAdm == undefined){
      this.mensajeError = "Debe seleccionar una imagen."
      this.ocultarMensaje();
      return false;
    }
    return true;
  }
  subirImagenAdmin() : Promise<any>{
    return new Promise((exito)=>{
      let file = this.imagenAdm;
      let imgRef = ref(this.storage, `${file.name}`);
      uploadBytes(imgRef, file)
      .then(()=>{
        getDownloadURL(imgRef)
        .then( url => {
          this.urlAdm = url
          exito("OK")
        });
      })
      .catch( error => {
        console.log(error)
      })
    })
  }
  verImagenAdm(event:any){
    this.imagenAdm = event.target.files[0];
  }
  crearAdmin(){
    this.spinner= true;
    if(this.evaluarErrorInputsAdmin()){
      createUserWithEmailAndPassword(this.auth, this.mail?.value, this.clave?.value)
      .then( () => {
        this.subirImagenAdmin()
        .then( () =>{
          this.spinner= false;
          this.uServ.actualizarUsuariosAdmin(
            this.nombre?.value, this.apellido?.value, this.edad?.value, this.dni?.value,
            this.mail?.value, this.clave?.value, this.urlAdm, 'admin');
          this.uServ.loguearUsuario(this.mail?.value);
          this.router.navigateByUrl('');
        })
        .finally( () => {
          this.spinner= false;
        })
      })
      .catch(error => {
        this.evaluarErrorCWEAP(error.code);
      })
      .finally( () => {
        this.spinner= false;
      })
    }
  }

  //GENERAL
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
