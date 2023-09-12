import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {AppLoginComponent} from "./app.login.component";
import {DividerModule} from "primeng/divider";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";

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
        ReactiveFormsModule]
})
export class AuthenticationModule {
}
