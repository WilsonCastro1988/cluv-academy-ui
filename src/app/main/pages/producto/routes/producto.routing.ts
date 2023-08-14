import {Routes} from '@angular/router';
import {AuthGuard} from "../../../../_guards/auth.guard";
import {ProductListComponent} from "../components/product-list/product-list.component";
import {ProductDetailComponent} from "../components/product-detail/product-detail.component";
import {ProductAddComponent} from "../components/product-add/product-add.component";
import {ProductCheckoutComponent} from "../components/product-checkout/product-checkout.component";
import {OrderHistoryComponent} from "../components/order-history/order-history.component";
import {OrderSumaryComponent} from "../components/order-sumary/order-sumary.component";
import {InvoiceComponent} from "../components/invoice/invoice.component";


export const RUTA_PRODUCT: Routes = [
    {
        path: 'product-list',
        component: ProductListComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'product-detail',
        component: ProductDetailComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'product-add',
        component: ProductAddComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'product-checkout',
        component: ProductCheckoutComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'order-history',
        component: OrderHistoryComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'order-summary',
        component: OrderSumaryComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'invoice',
        component: InvoiceComponent,
        canActivate: [AuthGuard],
    },
];
