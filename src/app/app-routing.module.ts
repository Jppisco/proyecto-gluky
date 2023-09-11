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
  { path: 'list-U/:id_instancia', component: ListUsuarioComponent },
  { path: 'create-U/:id_instancia', component: CreateUsuarioComponent },
  { path: 'edit-U/:id/:id_instancia', component: CreateUsuarioComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
