import {Routes} from '@angular/router';
import {AuthGuard} from "../../../../_guards/auth.guard";
import {UsuariosComponent} from "../components/usuarios.component";


export const RUTA_USUARIOS: Routes = [
    {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [AuthGuard],
    }


];
