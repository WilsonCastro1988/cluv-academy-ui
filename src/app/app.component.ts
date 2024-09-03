import {Component, HostListener, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {TokenService} from "./_service/token.service";
import {AppService} from "./_service/app.service";
import {Router} from "@angular/router";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private sessionTimer: number;
    private sessionTimeout: number; // Almacenará el tiempo de sesión en segundos

    menuMode = 'static';
    colorScheme = 'light';

    menuTheme = 'layout-sidebar-orange';
    //menuTheme = 'layout-sidebar-cyan';

    inputStyle = 'outlined';

    ripple: boolean;

    constructor(private primengConfig: PrimeNGConfig,
                private router: Router,
                private appService: AppService, private tokenService:TokenService) {

        /*if(this.appService.isAuthenticated()) {
            console.log('Authenticated IN APP COMPONENT');
            const expirationTime = this.appService.obtenerInfoToken(tokenService.getToken()).exp
            // Calcular el tiempo de sesión restante en segundos
            const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
            this.sessionTimeout = expirationTime - currentTime;

            // Iniciar el temporizador
            this.resetSessionTimer();
        }*/
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.ripple = true;
    }

    /*@HostListener('window:mousemove', ['$event'])
    @HostListener('window:keydown', ['$event'])
    onUserActivity() {
        if (this.appService.isAuthenticated()) {
            // Restablecer el temporizador si el usuario está autenticado y hay actividad
            this.resetSessionTimer();
        }
    }*/


    private resetSessionTimer() {
        clearTimeout(this.sessionTimer);
        this.sessionTimer = setTimeout(() => {
            // El tiempo de sesión ha expirado; ejecutar acciones como el cierre de sesión
            this.appService.logout();
            // Redirigir al usuario a la página de inicio de sesión
            this.router.navigate(['cluv/landing'])
        }, this.sessionTimeout * 1000); // Utilizar el tiempo de sesión restante


        const interval = 1000; // Intervalo de 1 segundo
        let secondsRemaining = this.sessionTimeout;

        const countdown = () => {
            secondsRemaining--;

            if (secondsRemaining >= 0) {
                setTimeout(countdown, interval);
            }
        };

        countdown();

    }
}
