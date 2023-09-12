import {Routes} from '@angular/router';
import {PostulationSenseiListComponent} from "../components/postulation-sensei-list/postulation-sensei-list.component";
import {AuthGuard} from "../../../../_guards/auth.guard";

export const RUTA_POSTULACIONES_SENSEI: Routes = [
    {
        path: 'postulation-sensei-list',
        component: PostulationSenseiListComponent,
        canActivate: [AuthGuard],
    },
];
