import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Storage, ref } from '@angular/fire/storage';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';

@Component({
  selector: 'app-alta-especialista',
  templateUrl: './alta-especialista.component.html',
  styleUrls: ['./alta-especialista.component.css']
})
export class AltaEspecialistaComponent implements OnInit {

  loading! : boolean;
  spinner! : boolean;
  formEsp!: FormGroup;
  especialista! : boolean;
  mensajeError: string | undefined;
  imagenEsp! : any
  urlEsp! : any;

  constructor(
    private auth : Auth,
    private router: Router,
    private uServ : UsuarioService,
    private storage: Storage
  ) {
    this.loading = true;
    this.spinner = false;
    this.especialista = false;
  }

  ngOnInit(): void {
    this.especialista = true;
    this.formEsp = new FormGroup({
      nombre: new FormControl('', [Validators.pattern('^[a-zA-Z]+$'),Validators.required]),
      apellido: new FormControl('', [Validators.pattern('^[a-zA-Z]+$'),Validators.required]),
      edad: new FormControl('', [Validators.required, Validators.minLength(18), Validators.maxLength(99)] ),
      especialidad: new FormControl('', [Validators.required]),
      otraEsp: new FormControl('', ),
      dni: new FormControl('', [Validators.pattern('^[0-9]{8}$'),Validators.required]),
      mail: new FormControl('', [Validators.email,Validators.required]),
      clave: new FormControl('', [Validators.minLength(6),Validators.required]),
      reingresoClave: new FormControl('', [Validators.minLength(6),Validators.required]),
    });
    this.otrasEsp?.disable();
    setTimeout(() =>{ this.loading= false; }, 1000)
  }

  get nombreEsp(){
    return this.formEsp.get('nombre');
  }
  get apellidoEsp(){
    return this.formEsp.get('apellido');
  }
  get edadEsp(){
    return this.formEsp.get('edad');
  }
  get dniEsp(){
    return this.formEsp.get('dni');
  }
  get especialidad(){
    return this.formEsp.get('especialidad');
  }
  get mailEsp(){
    return this.formEsp.get('mail');
  }
  get otrasEsp(){
    return this.formEsp.get('otraEsp');
  }
  get claveEsp(){
    return this.formEsp.get('clave');
  }
  get reingresoClaveEsp(){
    return this.formEsp.get('reingresoClave');
  }
  evaluarErrorInputsEspecialista(){
    if(!this.nombreEsp?.valid){
      this.mensajeError = "El campo 'Nombre' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(!this.apellidoEsp?.valid){
      this.mensajeError = "El campo 'Apellido' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(!this.edadEsp?.valid){
      this.mensajeError = "El campo 'Edad' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(!this.dniEsp?.valid){
      this.mensajeError = "El campo 'DNI' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(!this.especialidad?.valid){
      this.mensajeError = "El campo 'Especialidad' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(!this.verificarInputsEspecialidad()){
      this.mensajeError = "El campo 'Otra Especialidad' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(!this.mailEsp?.valid){
      this.mensajeError = "El campo 'Email' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(!this.claveEsp?.valid){
      this.mensajeError = "El campo 'Contraseña' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(!this.reingresoClaveEsp?.valid){
      this.mensajeError = "El campo 'Reingrese Contraseña' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(this.claveEsp?.value != this.reingresoClaveEsp?.value){
      this.mensajeError = "Las contraseñas deben coincidir."
      this.ocultarMensaje();
      return false;
    }
    else if(this.imagenEsp == undefined){
      this.mensajeError = "Debe seleccionar una imagen."
      this.ocultarMensaje();
      return false;
    }
    return true;
  }
  verificarInputsEspecialidad() : boolean{
    if(this.otrasEsp?.enabled == true && this.otrasEsp?.valid == true){
      return false;
    }else{
      return true;
    }
  }
  verificarHabilitarOtras(){
    if(this.especialidad?.value == "otra"){
      this.otrasEsp?.enable();
    }else{
      this.otrasEsp?.disable();
      this.otrasEsp?.reset();
    }
  }
  subirImagenEspecilista() : Promise<any>{
    return new Promise((exito)=>{
      let file = this.imagenEsp;
      let imgRef = ref(this.storage, `${file.name}`);
      uploadBytes(imgRef, file)
      .then(()=>{
        getDownloadURL(imgRef)
        .then( url => {
          this.urlEsp = url
          exito("OK")
        });
      })
      .catch( error => {
        console.log(error)
      })
    })
  }
  verImagenEsp(event:any){
    this.imagenEsp = event.target.files[0];
  }
  crearEspecialista(){
    this.spinner= true;
    if(this.evaluarErrorInputsEspecialista()){
      createUserWithEmailAndPassword(this.auth, this.mailEsp?.value, this.claveEsp?.value)
      .then( () => {
        this.subirImagenEspecilista()
        .then( () =>{
          this.spinner= false;
          let especialidadEsp;
          if(this.especialidad?.value == "otra"){
            especialidadEsp = this.otrasEsp?.value;
          }else{
            especialidadEsp = this.especialidad?.value;
          }
          this.uServ.actualizarUsuariosEspecialista(
            this.nombreEsp?.value, this.apellidoEsp?.value, this.edadEsp?.value, this.dniEsp?.value,
            especialidadEsp, this.mailEsp?.value, this.claveEsp?.value, this.urlEsp, 'especialista');
          this.uServ.loguearUsuario(this.mailEsp?.value);
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
