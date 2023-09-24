import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
/*Modulos*/

import {DashboardModule} from "../dashboard/module/dashboard.module";
import {ProductService} from "../dashboard/services/productservice";

import {SharedTableComponent} from "../../_shared/_components/shared-table/shared-table.component";

import {TableModule} from "primeng/table";
import { ProductCheckoutComponent } from './producto/components/product-checkout/product-checkout.component';
import { OrderHistoryComponent } from './producto/components/order-history/order-history.component';
import { OrderSumaryComponent } from './producto/components/order-sumary/order-sumary.component';
import { InvoiceComponent } from './producto/components/invoice/invoice.component';

import { StudentFormComponent } from './student/components/student-form/student-form.component';

@NgModule({
    declarations: [

        SharedTableComponent,

  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        DashboardModule,



        TableModule,

    ],

    providers: [ProductService]
})
export class PagesModule {
}
