import {Routes} from '@angular/router';
import {AuthGuard} from "../../../../_guards/auth.guard";
import {ReconocimientoClubComponent} from "../components/reconocimiento-club.component";


export const RUTA_RECONOCIMIENTO_CLUB: Routes = [
    {
        path: 'reconocimiento-club',
        component: ReconocimientoClubComponent,
        canActivate: [AuthGuard],
    }


];
