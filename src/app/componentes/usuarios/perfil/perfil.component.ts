import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { AutenticacionService } from 'src/app/servicios/autenticacionService';
import { SessionService } from 'src/app/servicios/sessionService';
import { UsuariosService } from 'src/app/servicios/usuariosService';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  public formulario:FormGroup
  public usuario:Usuario
  public mensaje:String
  public mensajeError:String

  constructor(
    private formBuilder:FormBuilder,
    private autenticationService:AutenticacionService
  ) {
    // obtener el usuario si ya se han metido datos en el pasado
    let usuario:Usuario = autenticationService.getUsuario()

    this.formulario = formBuilder.group({
      _id        : formBuilder.control(usuario._id),
      nombre     : formBuilder.control(usuario.nombre, [ Validators.required ]),
      login      : formBuilder.control(usuario.login),
      pw         : formBuilder.control(usuario.pw, [ Validators.required, Validators.minLength(8) ]),
      idioma     : formBuilder.control(usuario.idioma),
      correoE    : formBuilder.control(usuario.correoE, [ Validators.required, Validators.email ]),
      telefono   : formBuilder.control(usuario.telefono, [ Validators.required ]),
      direccion  : formBuilder.control(usuario.direccion, [ Validators.required ]),
    })
  }

  ngOnInit(): void {
  }

  public guardar():void {
    this.formulario.markAllAsTouched()
    if (this.formulario.invalid) {
      return
    }
    this.autenticationService.modificarUsuario(this.formulario.value)
    .subscribe(
      () => { this.mensaje = "El perfil se modificó correctamente" },
      () => { this.mensajeError = "Hubo un problema con el servidor" }
    )
  }

  public baja():void {

  }
}
