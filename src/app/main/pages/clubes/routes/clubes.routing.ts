import {Routes} from '@angular/router';
import {AuthGuard} from "../../../../_guards/auth.guard";
import {ClubesComponent} from "../components/clubes.component";


export const RUTA_CLUB: Routes = [
    {
        path: 'clubes',
        component: ClubesComponent,
        canActivate: [AuthGuard],
    }


];
