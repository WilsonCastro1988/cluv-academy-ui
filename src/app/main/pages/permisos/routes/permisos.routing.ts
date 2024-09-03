import {Routes} from '@angular/router';
import {AuthGuard} from "../../../../_guards/auth.guard";
import {PermisosComponent} from "../components/permisos.component";


export const RUTA_PERMISOS: Routes = [
    {
        path: 'permisos',
        component: PermisosComponent,
        canActivate: [AuthGuard],
    }


];
