import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DatePipe, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {FullCalendarModule} from '@fullcalendar/angular';

import {AppCodeModule} from './app.code.component';
import {AppComponent} from './app.component';
import {AppMainComponent} from './layout/content/app.main.component';
import {AppConfigComponent} from './layout/config/app.config.component';
import {AppRightmenuComponent} from './layout/menu/app.rightmenu.component';
import {AppMenuComponent} from './layout/menu/app.menu.component';
import {AppMenuitemComponent} from './layout/menu/app.menuitem.component';
import {AppTopBarComponent} from './layout/header/app.topbar.component';
import {AppSearchComponent} from './layout/search/app.search.component';
import {AppFooterComponent} from './layout/footer/app.footer.component';
import {AppHelpComponent} from './main/help/app.help.component';
import {AppNotfoundComponent} from './main/notfound/app.notfound.component';
import {AppErrorComponent} from './main/error/app.error.component';
import {AppAccessdeniedComponent} from './main/forbidden/app.accessdenied.component';

import {BreadcrumbService} from './_service/utils/app.breadcrumb.service';
import {MenuService} from './layout/menu/app.menu.service';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {ConfirmationService, MessageService} from 'primeng/api';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {JwtModule} from "@auth0/angular-jwt";
import {PrimengModule} from "./primeng/primeng.module";
import {AuthenticationModule} from "./main/pages/login/login.module";
import {generalInterceptor} from "./_interceptor/general.interceptor";
import {LandingModule} from "./main/pages/landing/landing.module";


export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

FullCalendarModule.registerPlugins([
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin
]);

@NgModule({
    imports: [
        AuthenticationModule,
        LandingModule,
        //PagesModule,
        //ReactiveFormsModule,
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,

        AppCodeModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        JwtModule.forRoot({
            config: {
                tokenGetter: function tokenGetter() {
                    return sessionStorage.getItem('AuthToken');
                }
            }
        }),
        PrimengModule,
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppRightmenuComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppConfigComponent,
        AppTopBarComponent,
        AppSearchComponent,
        AppFooterComponent,
        AppHelpComponent,
        AppNotfoundComponent,
        AppErrorComponent,
        AppAccessdeniedComponent,
        //DropdownComponent,
    ],
    providers: [
        //encryptionInterceptor,
        //decryptionInterceptor,
        generalInterceptor,
        DatePipe,
        MessageService,
        ConfirmationService,
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        MenuService, BreadcrumbService
    ],

    bootstrap: [AppComponent]
})
export class AppModule {
}
