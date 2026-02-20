import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { TransferenciaComponent } from './transferencia/transferencia.component';
import { ReportesComponent } from './reportes/reportes.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registro',
        component: RegistroComponent
    },
    {
        path: 'transferencia',
        component: TransferenciaComponent
    },
    {
        path: 'reportes',
        component: ReportesComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }