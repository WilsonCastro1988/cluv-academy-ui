import {Routes} from '@angular/router';
import {AuthGuard} from "../../../../_guards/auth.guard";
import {StudentFormComponent} from "../components/student-form/student-form.component";
import {ClasesStudentListComponent} from "../components/clases-student-list/clases-student-list.component";
import {StudentPersonalInfoComponent} from "../components/perfil/student-personal-info/student-personal-info.component";
import {StudentPrincipalInfoComponent} from "../components/perfil/student-principal-info.component";



export const RUTA_STUDENT: Routes = [
    {
        path: 'student-register',
        component: StudentFormComponent,
        //canActivate: [AuthGuard],
    },
    {
        path: 'clases-student-list',
        component: ClasesStudentListComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'student-profile',
        component: StudentPrincipalInfoComponent,
        canActivate: [AuthGuard],
    },




];
