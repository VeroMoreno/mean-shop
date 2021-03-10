import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/common/cabecera/cabecera.component';
import { MenuComponent } from './componentes/common/menu/menu.component';
import { PieComponent } from './componentes/common/pie/pie.component';
import { AceptacionTerminosComponent } from './componentes/usuarios/aceptacion-terminos/aceptacion-terminos.component';
import { LoginComponent } from './componentes/usuarios/login/login.component';
import { PerfilComponent } from './componentes/usuarios/perfil/perfil.component';
import { RegistroComponent } from './componentes/usuarios/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    AceptacionTerminosComponent,
    PerfilComponent,
    CabeceraComponent,
    MenuComponent,
    PieComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
