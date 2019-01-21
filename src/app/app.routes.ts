import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { EntryComponent } from './components/entry/entry.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard]
    },
    {
        path: 'admin', component: AdminComponent, canActivate: [AuthGuard]
    },
    {
        path: 'logout', component: LogoutComponent
    },
    {
        path: 'security', component: EntryComponent
    },
  {path: '**', redirectTo: 'logout', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
