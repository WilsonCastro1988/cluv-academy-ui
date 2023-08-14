import {Routes} from '@angular/router';
import {AuthGuard} from "../../../../_guards/auth.guard";
import {SenseiFormComponent} from "../components/sensei-form/sensei-form.component";



export const RUTA_SENSEI: Routes = [
    {
        path: 'sensei-register',
        component: SenseiFormComponent,
        canActivate: [AuthGuard],
    },
];
