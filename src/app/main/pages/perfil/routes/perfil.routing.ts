import {Routes} from '@angular/router';
import {AuthGuard} from "../../../../_guards/auth.guard";
import {PerfilComponent} from "../components/perfil.component";


export const RUTA_PERFILES: Routes = [
    {
        path: 'perfiles',
        component: PerfilComponent,
        canActivate: [AuthGuard],
    }


];
