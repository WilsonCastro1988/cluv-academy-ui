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

@NgModule({
    declarations: [

        SharedTableComponent,
        StudentFormComponent,
        SenseiFormComponent,
        PostulationSenseiListComponent,

        InvoiceComponent,
        OrderHistoryComponent,
        OrderSumaryComponent,
        ProductAddComponent,
        ProductCheckoutComponent,
        ProductDetailComponent,
        ProductListComponent

    ],
    imports: [
        RouterModule.forChild(RUTA_POSTULACIONES_SENSEI),
        RouterModule.forChild(RUTA_PRODUCT),
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
