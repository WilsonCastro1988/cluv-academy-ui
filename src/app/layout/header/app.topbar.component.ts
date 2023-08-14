import {Component, OnDestroy} from '@angular/core';
import {AppComponent} from '../../app.component';
import {AppMainComponent} from '../content/app.main.component';
import {BreadcrumbService} from '../../_service/utils/app.breadcrumb.service';
import {Subscription} from 'rxjs';
import {MenuItem} from 'primeng/api';
import {TokenService} from "../../_service/token.service";
import {AppService} from "../../_service/app.service";
import {MenuLightService} from "../../_service/menu.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnDestroy {

    subscription: Subscription;
    imgURL = 'data:image/jpg;base64,';
    currentUser: string;
    roles: any[] = [];

    items: MenuItem[];

    constructor(public breadcrumbService: BreadcrumbService,
                public app: AppComponent,
                public router: Router,
                private menuService: MenuLightService,
                public appMain: AppMainComponent,
                private tokenService: TokenService,
                private appService: AppService) {
        this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
        });
        if (this.tokenService.getCurrentUser() != null) {
            this.imgURL = "https://2.bp.blogspot.com/-ZecRzu-6rLI/TsIHy8oGBsI/AAAAAAAABJA/3kymvuNE5WQ/s1600/2-Avatares-para-Facebook.jpg"
            this.currentUser = this.tokenService.getCurrentUser();
            this.roles = JSON.parse(this.tokenService.getRoles());
        }
    }

    logout() {
        this.appService.logout();
    }

    clearMenuLab(rol) {
        if (rol.includes('Administrador del Sistema')) {
            this.menuService.setMenusJsonLab(null);
            this.router.navigate(['dashboard'])
                .then(() => {
                    window.location.reload();
                });
        } else {
            this.router.navigate(['laboratorio-lista'])
                .then(() => {
                    window.location.reload();
                });

        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
