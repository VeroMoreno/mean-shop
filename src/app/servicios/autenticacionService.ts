import { Observable } from "rxjs";
import { Usuario } from 'src/app/entidades/usuario'
import { SessionService } from "./sessionService";
import { HttpClient } from "@angular/common/http";
import { ConfiguracionUtil } from "../util/configuracionUtil";
import { Injectable } from "@angular/core";

@Injectable({ providedIn : 'root' })
export class AutenticacionService {
    public constructor(private httpClient:HttpClient,
    private sessionService:SessionService) {
}

public login(usuario:Usuario):Observable<any>{
    return new Observable( subscriber => {
        let observable:Observable<any> = this.httpClient.post(ConfiguracionUtil.urlServidor+"/login", usuario)
        observable.subscribe(
            data => {
                console.log(data)
                this.sessionService.setItem("JWT",data.JWT)
                this.sessionService.setItem("usuario",data.usuario)
                subscriber.next()
                subscriber.complete()
            },
            error => {
                subscriber.error(error)
                subscriber.complete()
            }
        )
    })
}
}