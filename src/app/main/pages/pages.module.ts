import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
/*Modulos*/

import {DashboardModule} from "../dashboard/module/dashboard.module";
import {ProductService} from "../dashboard/services/productservice";
import {TableModule} from "primeng/table";
import {StudentFormComponent} from "./student/components/student-form/student-form.component";
import {PasswordModule} from "primeng/password";
import {CheckboxModule} from "primeng/checkbox";
import {RouterLinkWithHref, RouterModule} from "@angular/router";
import {SenseiFormComponent} from "./sensei/components/sensei-form/sensei-form.component";
import {
    PostulationSenseiListComponent
} from "./postulation-sensei/components/postulation-sensei-list/postulation-sensei-list.component";
import {SharedTableComponent} from "../../_shared/_components/shared-table/shared-table.component";
import {RUTA_POSTULACIONES_SENSEI} from "./postulation-sensei/routes/postulacion-sensei.routing";
import {ButtonModule} from "primeng/button";
import {PrimengModule} from "../../primeng/primeng.module";

@NgModule({
    declarations: [

        SharedTableComponent,
        StudentFormComponent,
        SenseiFormComponent,
        PostulationSenseiListComponent

    ],
    imports: [
        RouterModule.forChild(RUTA_POSTULACIONES_SENSEI),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        DashboardModule,
        PrimengModule

    ],
    providers: [ProductService]
})
export class PagesModule {
}
