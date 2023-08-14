import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {TooltipModule} from "primeng/tooltip";
import {DataViewModule} from "primeng/dataview";
import {DropdownModule} from "primeng/dropdown";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PanelModule } from 'primeng/panel';
import {StyleClassModule} from "primeng/styleclass";
import {RippleModule} from "primeng/ripple";
import {ToolbarModule} from "primeng/toolbar";
import {TableModule} from "primeng/table";
import {DividerModule} from "primeng/divider";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FileUploadModule} from "primeng/fileupload";
import {InputNumberModule} from "primeng/inputnumber";
import {DialogModule} from "primeng/dialog";
import {SpeedDialModule} from "primeng/speeddial";
import {AutoCompleteModule} from "primeng/autocomplete";
import {PrimengModule} from "src/app/primeng/primeng.module";
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {CdkTableModule} from "@angular/cdk/table";
import {KeyFilterModule} from "primeng/keyfilter";
import {InputMaskModule} from "primeng/inputmask";
import { SplitterModule } from 'primeng/splitter';
import {SplitButtonModule} from "primeng/splitbutton";
import {TagModule} from "primeng/tag";
import { TreeModule } from 'primeng/tree';
import {TreeTableModule} from "primeng/treetable";
import {ProductListComponent} from "../components/product-list/product-list.component";
import {RUTA_PRODUCT} from "../routes/producto.routing";
import {ProductDetailComponent} from "../components/product-detail/product-detail.component";
import {TabViewModule} from "primeng/tabview";
import {InputSwitchModule} from "primeng/inputswitch";
import {ProductAddComponent} from "../components/product-add/product-add.component";
import {EditorModule} from "primeng/editor";
import {CheckboxModule} from "primeng/checkbox";
import {ProductCheckoutComponent} from "../components/product-checkout/product-checkout.component";
import {OrderHistoryComponent} from "../components/order-history/order-history.component";
import {OrderSumaryComponent} from "../components/order-sumary/order-sumary.component";
import {InvoiceComponent} from "../components/invoice/invoice.component";


@NgModule({
    declarations: [


        ProductListComponent,
        ProductDetailComponent,
        ProductAddComponent,
        ProductCheckoutComponent,
        OrderHistoryComponent,
        OrderSumaryComponent,
        InvoiceComponent


    ],
    exports: [
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(RUTA_PRODUCT),
        InputTextModule,
        InputNumberModule,
        DialogModule,
        InputTextareaModule,
        FileUploadModule,
        ButtonModule,
        CalendarModule,
        TooltipModule,
        DataViewModule,
        DropdownModule,
        ConfirmDialogModule,
        ReactiveFormsModule,
        PanelModule,
        StyleClassModule,
        RippleModule,
        ToolbarModule,
        TableModule,
        DividerModule,
        FormsModule,
        SpeedDialModule,
        AutoCompleteModule,
        SpeedDialModule,
        ScrollPanelModule,
        PrimengModule,
        CdkTableModule,
        KeyFilterModule,
        InputMaskModule,
        NgOptimizedImage,
        SplitterModule,
        SplitButtonModule,
        TagModule,
        TreeModule,
        TreeTableModule,
        TabViewModule,
        TableModule,
        InputSwitchModule,
        EditorModule,
        CheckboxModule,
    ]
})
export class ProductoModule {
}
