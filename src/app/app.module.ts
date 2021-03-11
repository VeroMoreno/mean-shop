import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@Angular/common/http';

import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/common/cabecera/cabecera.component';
import { MenuComponent } from './componentes/common/menu/menu.component';
import { PieComponent } from './componentes/common/pie/pie.component';
import { AceptacionTerminosComponent } from './componentes/usuarios/aceptacion-terminos/aceptacion-terminos.component';
import { LoginComponent } from './componentes/usuarios/login/login.component';
import { PerfilComponent } from './componentes/usuarios/perfil/perfil.component';
import { RegistroComponent } from './componentes/usuarios/registro/registro.component';
import { CommonTiendaComponent } from './componentes/common/common-tienda/common-tienda.component';
import { CommonLoginComponent } from './componentes/common/common-login/common-login.component';

let rutasCommonLogin = [
  // login, registro y aceptacion
  {
    path      : '',
    component : LoginComponent
  },
  {
    path      : 'registro',
    component : RegistroComponent
  },
  {
    path      : 'aceptacion',
    component : AceptacionTerminosComponent
  }
]

let rutasCommonTienda = [
  {
    path      : 'perfil',
    component : PerfilComponent
  },
  /*{
    path      : 'catalogo',
    component : CatalogoComponent
  },
  {
    path      : 'cesta',
    component : CestaComponent
  }*/
]

// Estas rutas son para la primera carpeta de la url
let rutasPrimerRouterOutlet = [
  {
    path      : '',
    component : CommonLoginComponent,
    children : rutasCommonLogin
  },
  {
    path      : 'login',
    component : CommonLoginComponent,
    children : rutasCommonLogin
  },
  {
    path      : 'tienda',
    component : CommonTiendaComponent,
    children : rutasCommonTienda
  }
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    AceptacionTerminosComponent,
    PerfilComponent,
    CabeceraComponent,
    MenuComponent,
    PieComponent,
    CommonTiendaComponent,
    CommonLoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,                     // para el [(NgModel)]
    HttpClientModule,               // para la conexion
    RouterModule.forRoot(rutasPrimerRouterOutlet)    // para los router outlet
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
