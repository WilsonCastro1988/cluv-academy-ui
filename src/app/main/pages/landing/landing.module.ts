import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {DividerModule} from "primeng/divider";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {LandingComponent} from "./landing.component";
import {DialogModule} from "primeng/dialog";
import {AvatarModule} from "primeng/avatar";
import {CarouselModule} from "primeng/carousel";
import {PrimengModule} from "../../../primeng/primeng.module";

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

        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        NgOptimizedImage,

        PrimengModule

    ]
})
export class LandingModule {
}
