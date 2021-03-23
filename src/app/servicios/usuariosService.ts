import { Injectable } from "@angular/core"
import { Usuario } from '../entidades/usuario'
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { ConfiguracionUtil } from "../util/configuracionUtil"

//providedIn: root, inyecta de manera automatica para que pueda usar ese servicio en otros ficheros
@Injectable({ providedIn: 'root' })
export class UsuariosService {

  public constructor(private httpClient:HttpClient) {
  }

  comprobarLogin(login: string):Observable<any> {
    return this.httpClient.get(ConfiguracionUtil.urlServidor + "/comprobarLogin?login=" + login)
  }

  public altaUsuario(usuario:Usuario):Observable<any> {
    return this.httpClient.post(ConfiguracionUtil.urlServidor + "/usuarios", usuario)
  }

  public modificarUsuario(usuario:Usuario):Observable<any> {
    return this.httpClient.put(ConfiguracionUtil.urlServidor + "/usuarios/" + usuario._id, usuario)
  }

  public bajaUsuario():void {
  }
}