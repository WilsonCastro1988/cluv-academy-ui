import {Component, Input, OnInit} from '@angular/core';
import {ScrollService} from "../../../_service/utils/scroll-service.service";
import {Router} from "@angular/router";
import {AppService} from "../../../_service/app.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    @Input() userLogged: boolean = false;
    @Input() floatHeader: boolean = true;

    public headerClass: string = "header-container flex justify-content-between align-items-center";
    public sidePanelClass: string = "side-panel-closed";
    public activityPanelClass: string = "activity-user-container-closed";
    isLandingPage: boolean = true
    isLoggedIn: boolean;


    public usersDetails: any = {
        userAccounts: "details-window-container-closed",
        userPorfile: "details-window-container-closed",
        userNotifications: "details-window-container-closed",
    };

    public events: any = [
        {
            status: "Activity 1"
        },
        {
            status: "Activity 2"
        },
        {
            status: "Activity 3"
        },
    ];

    constructor(private scrollService: ScrollService,
                private readonly routeService: Router,
                private readonly serviceApp: AppService,
    ) {
        if(!this.routeService.url.includes('cluv/landing')){
            this.isLandingPage = false
        }
    }

    ngOnInit(): void {
        if (!this.userLogged) this.headerClass += " header-container-logged";
        if (!this.floatHeader) this.headerClass += " header-container-notFloat";

        this.isAutenticated()

    }

    goToLogindIn() {
        if (this.isLoggedIn)
            this.routeService.navigate(['/pages/dashboard'])
        else
            this.routeService.navigate(['/authentication/login']);
    }
    isAutenticated() {
        if (this.serviceApp.isAuthenticated()) {
            this.isLoggedIn = true
        } else this.isLoggedIn = false
    }


    openSidePanel() {
        this.sidePanelClass = (this.sidePanelClass === "side-panel-opened") ? "side-panel-closed" : "side-panel-opened";
    }

    openActivityPanel() {
        this.activityPanelClass = (this.activityPanelClass === "activity-user-container-closed") ? "activity-user-container-opened" : "activity-user-container-closed";
    }

    openUserDetails(view: string) {
        this.usersDetails[view] = (this.usersDetails[view] === "details-window-container") ? "details-window-container-closed" : "details-window-container";
    }

    scrollToSection(sectionId: string) {
        this.routeService.navigate(['cluv/landing']).then(() => {
            this.scrollService.scrollToSection(sectionId);
        })
    }
}
