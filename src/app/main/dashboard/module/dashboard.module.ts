import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {TooltipModule} from "primeng/tooltip";

import {RUTA_DASHBOARD} from "../routes/dashboard.routing";
import {DataViewModule} from "primeng/dataview";
import {DropdownModule} from "primeng/dropdown";
import {DashboardDemoComponent} from "../components/dashboarddemo.component";
import {ChartModule} from "primeng/chart";
import {MenuModule} from "primeng/menu";
import {TableModule} from "primeng/table";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        DashboardDemoComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(RUTA_DASHBOARD),
        InputTextModule,
        ButtonModule,
        CalendarModule,
        TooltipModule,
        DataViewModule,
        DropdownModule,
        ChartModule,
        MenuModule,
        TableModule,
        FormsModule
    ]
})
export class DashboardModule {
}
