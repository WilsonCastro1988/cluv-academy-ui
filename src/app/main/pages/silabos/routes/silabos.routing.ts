import {Routes} from '@angular/router';
import {AuthGuard} from "../../../../_guards/auth.guard";
import {SilabosComponent} from "../components/silabos.component";


export const RUTA_SILABOS: Routes = [
    {
        path: 'silabos',
        component: SilabosComponent,
        canActivate: [AuthGuard],
    }


];
