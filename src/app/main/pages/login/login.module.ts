import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {AppLoginComponent} from "./app.login.component";
import {DividerModule} from "primeng/divider";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {BlockUIModule} from "primeng/blockui";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {PagesModule} from "../pages.module";

const routes: Routes = [
    {
        path: 'authentication/login',
        component: AppLoginComponent,
    }
];

@NgModule({
    declarations: [
        AppLoginComponent,
    ],
    imports: [
        DividerModule,
        InputTextModule,
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        BlockUIModule,
        ConfirmDialogModule,
        ProgressSpinnerModule,
        PagesModule
    ]
})
export class AuthenticationModule {
}
