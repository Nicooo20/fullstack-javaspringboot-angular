import { TokenComponent } from './pages/login/recuperar/token/token.component';
import { Not404Component } from './pages/not404/not404.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarComponent } from './pages/login/recuperar/recuperar.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'}, //para cargar el proyecto y mandar directamente al login si no encuentra alguna ruta
  { path: 'login', component: LoginComponent },
  { path: 'recuperar', component: RecuperarComponent, children: [
    {path: ':token', component: TokenComponent}
  ] },
  { path: 'pages',
  component: LayoutComponent, //para que enuelva todo el nav en las diferentes paginas
  loadChildren: () => import('./pages/pages.module').then(m=> m.PagesModule)
  },
  {path: 'not-404', component: Not404Component},
  {path: '**', redirectTo: 'not-404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
