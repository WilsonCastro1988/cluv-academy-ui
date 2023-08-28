import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
/*Modulos*/

import {DashboardModule} from "../dashboard/module/dashboard.module";
import {ProductService} from "../dashboard/services/productservice";
import {SenseiModule} from "./sensei/module/sensei.module";
import {SharedTableComponent} from "../../_shared/_components/shared-table/shared-table.component";
import {ProductoModule} from "./producto/module/producto.module";
import {TableModule} from "primeng/table";
import { ProductCheckoutComponent } from './producto/components/product-checkout/product-checkout.component';
import { OrderHistoryComponent } from './producto/components/order-history/order-history.component';
import { OrderSumaryComponent } from './producto/components/order-sumary/order-sumary.component';
import { InvoiceComponent } from './producto/components/invoice/invoice.component';
import {StudentModule} from "./student/module/student.module";
import { StudentFormComponent } from './student/components/student-form/student-form.component';
import { MeetingZoomFormComponent } from './sensei/components/meeting-zoom-form/meeting-zoom-form.component';
import {PrimengModule} from "../../primeng/primeng.module";

@NgModule({
    declarations: [

        SharedTableComponent,
          MeetingZoomFormComponent,

  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        DashboardModule,

        SenseiModule,
        StudentModule,

        ProductoModule,

        TableModule,
        PrimengModule,

    ],

    providers: [ProductService]
})
export class PagesModule {
}
