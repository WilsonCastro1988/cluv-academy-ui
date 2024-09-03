import {Routes} from '@angular/router';
import {AuthGuard} from "../../../../_guards/auth.guard";
import {UserAdminComponent} from "../components/perfil/user-admin.component";


export const RUTA_ADMIN: Routes = [

    {
        path: 'user-profile',
        component: UserAdminComponent,
        canActivate: [AuthGuard],
    },


];
