import {Routes} from '@angular/router';
import {AuthGuard} from "../../../../_guards/auth.guard";
import {ClasesComponent} from "../components/crear-clases/clases.component";
import {ListadoClasesComponent} from "../components/listado-clases/listado-clases.component";
import {MeetZoomComponent} from "../components/meet-zoom/meet-zoom.component";


export const RUTA_CLASES: Routes = [
    {
        path: 'clases',
        component: ClasesComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'listado-clases',
        component: ListadoClasesComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'meet',
        component: MeetZoomComponent,
        canActivate: [AuthGuard],
    }
];
