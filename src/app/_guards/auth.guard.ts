import {Injectable} from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import {Observable} from 'rxjs';
import {AppService} from '../_service/app.service';
import {TokenService} from "../_service/token.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private appService: AppService,
                private tokenService: TokenService,) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {

        return this.getProfile();
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.canActivate(next, state);
    }

    getProfile() {
        if (this.appService.isAuthenticated()) {
            if( this.isTokenExpired() ){
                this.appService.logout();
                return false;
            }
            return true;
        }
        try {
            this.appService.getProfile();
            return true;
        } catch (error) {
            this.router.navigate(['cluv/landing']);
            return false;
        }
    }

    isTokenExpired(){
        try{
            let token = this.tokenService.getToken();
            let payload = this.appService.obtenerInfoToken(token);
            let now = new Date().getTime() / 1000;
            return payload.exp < now;
        }
        catch(error){
            return false;
        }
    }
}
