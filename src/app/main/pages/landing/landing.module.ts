import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {DividerModule} from "primeng/divider";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {LandingComponent} from "./landing.component";

const routes: Routes = [
    {
        path: 'cluv/landing',
        component: LandingComponent,
    }
];

@NgModule({
    declarations: [
        LandingComponent,
    ],
    imports: [
        DividerModule,
        InputTextModule,
        ButtonModule,
        RippleModule,
        CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule, NgOptimizedImage]
})
export class LandingModule {
}
