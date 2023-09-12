import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedTableComponent} from "../../_components/shared-table/shared-table.component";
import {TableModule} from "primeng/table";


@NgModule({
    declarations: [],
    exports: [], // Exporta el componente genérico
    imports: [
        CommonModule,
        TableModule
    ],
})
export class SharedModule {
}
