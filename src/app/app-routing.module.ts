import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListInstanciaComponent } from './components/list-instancia/list-instancia.component';
import { CreateInstanciaComponent } from './components/create-instancia/create-instancia.component';
import { ListUsuarioComponent } from './components/list-usuario/list-usuario.component';
import { CreateUsuarioComponent } from './components/create-usuario/create-usuario.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { CreateProgramaComponent } from './components/create-programa/create-programa.component';
import { ListProgramaComponent } from './components/list-programa/list-programa.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
  { path: 'verificar-correo', component: VerificarCorreoComponent },
  { path: 'recuperar-password', component: RecuperarPasswordComponent },
  { path: 'list-I', component: ListInstanciaComponent },
  { path: 'create-I', component: CreateInstanciaComponent },
  { path: 'edit/:id', component: CreateInstanciaComponent },
  { path: 'list-U', component: ListUsuarioComponent },
  { path: 'list-U/:id_programa', component: ListUsuarioComponent },
  { path: 'list-U/:id_programa/:id_instancia', component: ListUsuarioComponent },
  { path: 'list-U/:id_programa/:id_instancia', component: ListUsuarioComponent },
  { path: 'create-U/:id_programa', component: CreateUsuarioComponent },
  { path: 'edit-U/:id/:id_programa/:id_instancia', component: CreateUsuarioComponent },
  { path: 'create-P/:id_instancia', component: CreateProgramaComponent },
  { path: 'list-P/:id_instancia', component: ListProgramaComponent },
  { path: 'list-P', component: ListProgramaComponent },
  { path: 'edit-P/:id/:id_instancia', component: CreateProgramaComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
