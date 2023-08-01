import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./modulos/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./modulos/inicio/inicio.module').then(m => m.InicioModule)
  }, 
  {
    path: 'user',
    loadChildren: () => import('./modulos/user/user.module').then(m => m.UserModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
