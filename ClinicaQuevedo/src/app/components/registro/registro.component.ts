import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, sendEmailVerification } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';
import { Storage, ref } from '@angular/fire/storage';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import Swal from 'sweetalert2';
import { DisponibilidadService } from 'src/app/services/DisponibilidadService/disponibilidad.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  loading! : boolean;
  spinner! : boolean;
  paciente! : boolean;
  especialista! : boolean;
  formPac!: FormGroup;
  formEsp!: FormGroup;
  mensajeError: string | undefined;
  cantidadImgs! : boolean;
  imagenesAux! : Array<any>;
  urlsPac = {"url1":'', "url2":""}
  imagenEsp! : any
  urlEsp! : any;
  captcha: string | undefined;
  validado: boolean = false;

  constructor(
    private auth : Auth,
    private router: Router,
    private uServ : UsuarioService,
    private storage: Storage,
    private dServ : DisponibilidadService
  ) {
    this.loading = true;
    this.spinner = false;
    this.paciente = false;
    this.especialista = false;
    this.cantidadImgs = false;
    this.imagenesAux = new Array<any>();
  }

  ngOnInit(): void {
    setTimeout(() =>{ this.loading= false; }, 1000)
  }

  //PACIENTE
  seguirPaciente(){
    this.paciente = true;
    this.formPac = new FormGroup({
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
    return this.formPac.get('nombre');
  }
  get apellido(){
    return this.formPac.get('apellido');
  }
  get edad(){
    return this.formPac.get('edad');
  }
  get dni(){
    return this.formPac.get('dni');
  }
  get obrasocial(){
    return this.formPac.get('obrasocial');
  }
  get mail(){
    return this.formPac.get('mail');
  }
  get clave(){
    return this.formPac.get('clave');
  }
  get reingresoClave(){
    return this.formPac.get('reingresoClave');
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
    else if(this.validado == false){
      this.mensajeError = "Debe validar el captcha."
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
      this.imagenesAux.push(event.target.files[0]);
      this.imagenesAux.push(event.target.files[1]);
    }
  }
  subirImagenesPaciente(imagenes: any) : Promise<any>{
    return new Promise((exito)=>{

      let img1 = imagenes[0];
      let imgRef = ref(this.storage, `${img1.name}`);
      uploadBytes(imgRef, img1)
      .then(()=>{
        getDownloadURL(imgRef)
        .then( url => {
          this.urlsPac.url1 = url
          let img2 = imagenes[1];
          let imgRef2 = ref(this.storage, `${img2.name}`);
          uploadBytes(imgRef2, img2)
          .then(()=>{
            getDownloadURL(imgRef2)
            .then( url => {
              this.urlsPac.url2 = url;
              exito("OK")
            });
          })
          .catch( error => {
            console.log(error)
          })
        });
      })
      .catch( error => {
        console.log(error)
      })


    })
  }
  crearPaciente(){
    this.spinner= true;
    if(this.evaluarErrorInputsPaciente()){
      createUserWithEmailAndPassword(this.auth, this.mail?.value, this.clave?.value)
      .then( respuesta => {
        this.subirImagenesPaciente(this.imagenesAux)
        .then( () => {
          this.spinner= false;
          this.uServ.actualizarUsuariosPaciente(
            this.nombre?.value, this.apellido?.value, this.edad?.value, this.dni?.value,
            this.obrasocial?.value, this.mail?.value, this.clave?.value, this.urlsPac, 'paciente');

            let auth = getAuth();
            sendEmailVerification(auth.currentUser!)
            .then( () => {
              Swal.fire({
                icon: 'success',
                title: 'El Paciente se creó con éxito!',
                text: 'Verifica la cuenta en tu casilla de email.',
                showConfirmButton: false,
                timer: 2000
              })
            })
            .catch(()=>{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrió un error!',
                showConfirmButton: false,
                timer: 2000
              })
            })
          this.router.navigateByUrl('');
        })
      })
      .catch(error => {
        this.evaluarErrorCWEAP(error.code);
      })
      .finally( () => {
        this.spinner= false;
      })
    }else{
      this.spinner= false;
    }
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    this.validado = true;
  }

  //ESPECIALISTA
  seguirEspecialista(){
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
    else if(this.validado == false){
      this.mensajeError = "Debe validar el captcha."
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
            especialidadEsp, this.mailEsp?.value, this.claveEsp?.value, this.urlEsp, 'especialista'
          );

          this.dServ.crearDisponibilidad(this.mailEsp?.value,especialidadEsp);

          let auth = getAuth();
          sendEmailVerification(auth.currentUser!)
          .then( () => {
            Swal.fire({
              icon: 'success',
              title: 'El Especialista se creó con éxito!',
              text: 'Verifica la cuenta en tu casilla de email.',
              showConfirmButton: false,
              timer: 2000
            })
          })
          .catch(()=>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ocurrió un error!',
              showConfirmButton: false,
              timer: 2000
            })
          })
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
    }else{
      this.spinner= false;
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
