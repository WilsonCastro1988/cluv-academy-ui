import {Routes} from '@angular/router';
import {AuthGuard} from "../../../../_guards/auth.guard";
import {SenseiFormComponent} from "../components/sensei-form/sensei-form.component";
import {MeetingZoomFormComponent} from "../components/meeting-zoom-form/meeting-zoom-form.component";
import {
    ClasesSenseiListComponent
} from "../../postulation-sensei/components/clases-sensei-list/clases-sensei-list.component";



export const RUTA_SENSEI: Routes = [
    {
        path: 'sensei-register',
        component: SenseiFormComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'create-meeting-zoom',
        component: MeetingZoomFormComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'clases-sensei-list',
        component: ClasesSenseiListComponent,
        canActivate: [AuthGuard],
    },
];
