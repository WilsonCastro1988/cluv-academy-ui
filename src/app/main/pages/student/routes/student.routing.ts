import {Routes} from '@angular/router';
import {AuthGuard} from "../../../../_guards/auth.guard";
import {StudentFormComponent} from "../components/student-form/student-form.component";
import {MeetingFormComponent} from "../components/meeting-form/meeting-form.component";



export const RUTA_STUDENT: Routes = [
    {
        path: 'student-register',
        component: StudentFormComponent,
        canActivate: [AuthGuard],
    },

    {
        path: 'student-meeting',
        component: MeetingFormComponent,
        canActivate: [AuthGuard],
    },
];
