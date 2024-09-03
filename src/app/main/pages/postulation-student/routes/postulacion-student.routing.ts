import {Routes} from '@angular/router';
import {
    PostulationStudentListComponent
} from "../components/postulation-student-list/postulation-student-list.component";
import {AuthGuard} from "../../../../_guards/auth.guard";

export const RUTA_POSTULACIONES_STUDENT: Routes = [
    {
        path: 'postulation-student-list',
        component: PostulationStudentListComponent,
        canActivate: [AuthGuard],
    },
];
