import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from './layout/content/app.main.component';
import {AppNotfoundComponent} from './main/notfound/app.notfound.component';
import {AppErrorComponent} from './main/error/app.error.component';
import {AppAccessdeniedComponent} from './main/forbidden/app.accessdenied.component';
import {AppLoginComponent} from './main/pages/login/app.login.component';
import {AuthGuard} from "./_guards/auth.guard";
import {LandingComponent} from "./main/pages/landing/landing.component";

const appRoutes: Routes = [
    {
        path: 'pages', component: AppMainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule),
    },
    {
        path: 'cluv/landing', component: LandingComponent,
    },
    {path: '', redirectTo: 'cluv/landing', pathMatch: 'full'},

    {path: 'error', component: AppErrorComponent},
    {path: 'access', component: AppAccessdeniedComponent},
    {path: 'notfound', component: AppNotfoundComponent},
    {path: '**', redirectTo: '/notfound'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
