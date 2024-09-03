import {Routes} from '@angular/router';
import {AuthGuard} from "../../../../_guards/auth.guard";
import {MateriaComponent} from "../components/materia.component";


export const RUTA_MATERIA: Routes = [
    {
        path: 'materia',
        component: MateriaComponent,
        canActivate: [AuthGuard],
    }


];
