import {Component, OnInit} from '@angular/core';
import {AppMainComponent} from '../content/app.main.component';
import {TokenService} from "../../_service/token.service";
import {MenuLightService} from "../../_service/menu.service";
import {MenuItem} from "primeng/api";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {

    model: any[];
    model2: any[]
    model3: any[]

    items: MenuItem[];
    menus: any;

    menuSubscription: Subscription;

    constructor(public appMain: AppMainComponent,
                private tokenService: TokenService,
                private menuService: MenuLightService) {
    }

    ngOnInit() {
        this.model = [
            {
                label: '', icon: 'pi pi-home',
                items: [
                    {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['dashboard']},
                ]
            },
            {separator: true},
        ];

        this.model2 = [
            {separator: true},
            {
                label: 'Academy', icon: 'pi pi-fw pi-download',
                items: [
                    {
                        label: 'Cluv', icon: 'pi pi-fw pi-globe', url: ['https://cluvacademy.com/']
                    },
                    {
                        label: 'Manual', icon: 'pi pi-fw pi-info-circle', routerLink: ['/documentation']
                    }
                ]
            },
        ];

        this.model3 = [
            {
                label: 'Senseis', icon: 'pi pi-fw pi-download',
                items: [
                    {
                        label: 'Programar', icon: 'pi pi-fw pi-history', url: ['https://cluvacademy.com/']
                    },
                    {
                        label: 'Horarios', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/documentation']
                    },
                    {
                        label: 'Ir a Clase', icon: 'pi pi-fw pi-megaphone', routerLink: ['/documentation']
                    }
                ]
            },
            {separator: true},
            {
                label: 'Costos', icon: 'pi pi-fw pi-download',
                items: [
                    {
                        label: 'Uno a Uno', icon: 'pi pi-fw pi-share-alt', url: ['https://cluvacademy.com/']
                    },
                    {
                        label: 'Grupal', icon: 'pi pi-fw pi-sitemap', routerLink: ['/documentation']
                    }
                ]
            },
        ];

        this.llenarMenus();
    }

    convertirItemsToMenuItems(items) {
        return items.map(item => {
            let menuItem = {} as MenuItem;
            menuItem.label = item.label;
            menuItem.icon = item.icon;
            menuItem.routerLink = item.routerLink;
            menuItem.badge = item.badge;
            if (item.menuList && item.menuList.length > 0) {
                menuItem.items = this.convertirItemsToMenuItems(item.menuList);
            }
            return menuItem;
        });
    }

    llenarMenus() {
        //console.log('GET MENU JSON APP ', this.menuService.getMenusJson())
        if (this.menuService.getMenusJsonLab() === null || this.menuService.getMenusJsonLab() === 'null') {
            if (this.menuService.getMenusJson() === null || this.menuService.getMenusJson() === 'null') {
                if (this.tokenService.getAlterCurrentUser())
                    this.tokenService.setCurrentUser(this.tokenService.getAlterCurrentUser())

                this.menuService.findByUsername(this.tokenService.getCurrentUser()).subscribe(
                    data => {
                        this.menus = data;

                        this.items = new Array();

                        this.items = this.convertirItemsToMenuItems(this.menus);


                        /*for (let objMenu of this.menus) {
                            let item: MenuItem;
                            item = {
                                label: objMenu.itemDTO.label,
                                icon: objMenu.itemDTO.icon,
                                url: objMenu.itemDTO.url,
                                routerLink: objMenu.itemDTO.routerLink,
                                items: objMenu.itemsDTO,
                                badge: objMenu.badge,
                            }
                            this.items.push(item);
                            this.menuService.setMenusJson(this.items);
                        }*/
                    },
                    err => {
                        console.log('status ' + err.status);
                        console.log('error message ' + err.error.message);
                        console.log('error ' + err.error);
                        console.log('message ' + err.message);

                    }
                );
            } else {
                this.items = new Array();
                this.items = JSON.parse(this.menuService.getMenusJson());
            }
        } else {
            this.items = new Array();
            this.items = JSON.parse(this.menuService.getMenusJsonLab());
        }


    }


}
