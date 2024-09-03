import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
/*Modulos*/
import {DashboardModule} from "../dashboard/module/dashboard.module";
import {ProductService} from "../dashboard/services/productservice";
import {StudentFormComponent} from "./student/components/student-form/student-form.component";
import {RouterModule} from "@angular/router";
import {SenseiFormComponent} from "./sensei/components/sensei-form/sensei-form.component";
import {
    PostulationSenseiListComponent
} from "./postulation-sensei/components/postulation-sensei-list/postulation-sensei-list.component";
import {SharedTableComponent} from "../../_shared/_components/shared-table/shared-table.component";
import {RUTA_POSTULACIONES_SENSEI} from "./postulation-sensei/routes/postulacion-sensei.routing";
import {PrimengModule} from "../../primeng/primeng.module";
import {RUTA_PRODUCT} from "./producto/routes/producto.routing";
import {InvoiceComponent} from "./producto/components/invoice/invoice.component";
import {OrderHistoryComponent} from "./producto/components/order-history/order-history.component";
import {OrderSumaryComponent} from "./producto/components/order-sumary/order-sumary.component";
import {ProductAddComponent} from "./producto/components/product-add/product-add.component";
import {ProductCheckoutComponent} from "./producto/components/product-checkout/product-checkout.component";
import {ProductDetailComponent} from "./producto/components/product-detail/product-detail.component";
import {ProductListComponent} from "./producto/components/product-list/product-list.component";
import {MeetingZoomFormComponent} from "./sensei/components/meeting-zoom-form/meeting-zoom-form.component";
import {RUTA_SENSEI} from "./sensei/routes/sensei.routing";
import {StyleClassModule} from "primeng/styleclass";
import {
    ClasesSenseiListComponent
} from './postulation-sensei/components/clases-sensei-list/clases-sensei-list.component';
import {ClasesStudentListComponent} from './student/components/clases-student-list/clases-student-list.component';
import {RUTA_STUDENT} from "./student/routes/student.routing";
import {
    SenseiPersonalInfoComponent
} from './sensei/components/perfil/sensei-personal-info/sensei-personal-info.component';
import {SenseiAcademyInfoComponent} from './sensei/components/perfil/sensei-academy-info/sensei-academy-info.component';
import {SenseiBankInfoComponent} from './sensei/components/perfil/sensei-bank-info/sensei-bank-info.component';
import {SenseiSkillInfoComponent} from './sensei/components/perfil/sensei-skill-info/sensei-skill-info.component';
import {
    SenseiMultimediaInfoComponent
} from './sensei/components/perfil/sensei-multimedia-info/sensei-multimedia-info.component';
import {SenseiPrincipalInfoComponent} from './sensei/components/perfil/sensei-principal-info.component';
import {SenseiDataComponent} from './sensei/components/perfil/sensei-data/sensei-data.component';
import {StudentPrincipalInfoComponent} from './student/components/perfil/student-principal-info.component';
import {
    StudentPersonalInfoComponent
} from './student/components/perfil/student-personal-info/student-personal-info.component';
import {
    StudentSecurityInfoComponent
} from './student/components/perfil/student-security-info/student-security-info.component';
import {
    SenseiSecurityInfoComponent
} from './sensei/components/perfil/sensei-security-info/sensei-security-info.component';
import {
    PostulationStudentListComponent
} from './postulation-student/components/postulation-student-list/postulation-student-list.component';
import {RUTA_POSTULACIONES_STUDENT} from "./postulation-student/routes/postulacion-student.routing";
import {AddSenseiComponent} from './postulation-sensei/components/add-sensei/add-sensei.component';
import {AddStudentComponent} from './postulation-student/components/add-student/add-student.component';
import {
    SenseiSchedulePreferComponent
} from './sensei/components/perfil/sensei-schedule-prefer/sensei-schedule-prefer.component';
import {ReconocimientoClubComponent} from './reconocimiento-club/components/reconocimiento-club.component';
import {RUTA_RECONOCIMIENTO_CLUB} from "./reconocimiento-club/routes/reconocimiento-club.routing";
import {ClubesComponent} from './clubes/components/clubes.component';
import {RUTA_CLUB} from "./clubes/routes/clubes.routing";
import {MateriaComponent} from './materia/components/materia.component';
import {RUTA_MATERIA} from "./materia/routes/materia.routing";
import {SilabosComponent} from './silabos/components/silabos.component';
import {RUTA_SILABOS} from "./silabos/routes/silabos.routing";
import {UsuariosComponent} from './usuarios/components/usuarios.component';
import {RUTA_USUARIOS} from "./usuarios/routes/usuarios.routing";
import {PerfilComponent} from './perfil/components/perfil.component';
import {RUTA_PERFILES} from "./perfil/routes/perfil.routing";
import {PermisosComponent} from './permisos/components/permisos.component';
import {RUTA_PERMISOS} from "./permisos/routes/permisos.routing";
import {ClasesComponent} from './clases/components/crear-clases/clases.component';
import {RUTA_CLASES} from "./clases/routes/clases.routing";
import { ListadoClasesComponent } from './clases/components/listado-clases/listado-clases.component';
import { EditarClaseComponent } from './clases/components/editar-clase/editar-clase.component';
import { MeetZoomComponent } from './clases/components/meet-zoom/meet-zoom.component';
import {HeaderComponent} from "../../_shared/_components/header/header.component";
import {FooterComponent} from "../../_shared/_components/footer/footer.component";
import {LogoComponent} from "../../_shared/_components/logo/logo.component";
import { UserAdminComponent } from './user-admin/components/perfil/user-admin.component';
import {RUTA_ADMIN} from "./user-admin/routes/admin.routing";
import {
    UserPersonalInfoComponent
} from "./user-admin/components/perfil/user-personal-info/user-personal-info.component";
import {
    UserSecurityInfoComponent
} from "./user-admin/components/perfil/user-security-info/user-security-info.component";
import {ScrollPanelModule} from "primeng/scrollpanel";

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        LogoComponent,

        SharedTableComponent,
        StudentFormComponent,
        SenseiFormComponent,
        MeetingZoomFormComponent,
        PostulationSenseiListComponent,

        InvoiceComponent,
        OrderHistoryComponent,
        OrderSumaryComponent,
        ProductAddComponent,
        ProductCheckoutComponent,
        ProductDetailComponent,
        ProductListComponent,
        ClasesSenseiListComponent,
        ClasesStudentListComponent,
        SenseiPersonalInfoComponent,
        SenseiAcademyInfoComponent,
        SenseiBankInfoComponent,
        SenseiSkillInfoComponent,
        SenseiMultimediaInfoComponent,
        SenseiPrincipalInfoComponent,
        SenseiDataComponent,
        StudentPrincipalInfoComponent,
        StudentPersonalInfoComponent,
        StudentSecurityInfoComponent,
        SenseiSecurityInfoComponent,
        PostulationStudentListComponent,
        AddSenseiComponent,
        AddStudentComponent,
        SenseiSchedulePreferComponent,
        ReconocimientoClubComponent,
        ClubesComponent,
        MateriaComponent,
        SilabosComponent,
        UsuariosComponent,
        PerfilComponent,
        PermisosComponent,
        ClasesComponent,
        ListadoClasesComponent,
        EditarClaseComponent,
        MeetZoomComponent,
        UserAdminComponent,
        UserPersonalInfoComponent,
        UserSecurityInfoComponent

    ],
    imports: [
        RouterModule.forChild(RUTA_POSTULACIONES_SENSEI),
        RouterModule.forChild(RUTA_POSTULACIONES_STUDENT),
        RouterModule.forChild(RUTA_STUDENT),
        RouterModule.forChild(RUTA_PRODUCT),
        RouterModule.forChild(RUTA_SENSEI),
        RouterModule.forChild(RUTA_RECONOCIMIENTO_CLUB),
        RouterModule.forChild(RUTA_CLUB),
        RouterModule.forChild(RUTA_MATERIA),
        RouterModule.forChild(RUTA_SILABOS),
        RouterModule.forChild(RUTA_USUARIOS),
        RouterModule.forChild(RUTA_PERFILES),
        RouterModule.forChild(RUTA_PERMISOS),
        RouterModule.forChild(RUTA_CLASES),
        RouterModule.forChild(RUTA_ADMIN),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        DashboardModule,
        PrimengModule,
        StyleClassModule,
        ScrollPanelModule,


    ],
    exports: [
        HeaderComponent,
        MeetZoomComponent,
        LogoComponent
    ],
    providers: [ProductService]
})
export class PagesModule {
}
