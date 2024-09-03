import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {AppComponent} from '../../../app.component';
import {AppService} from '../../../_service/app.service';
import {Router} from '@angular/router';
import {TokenService} from '../../../_service/token.service';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {TokenDto} from '../../../_dto/token-dto';
import {LoginRequestDto} from '../../../_dto/login-request-dto';
import {severities} from '../../../_enums/constDomain';

@Component({
    selector: 'app-login',
    templateUrl: './app.login.component.html',
    styleUrls: ['./login.component.scss']
})
export class AppLoginComponent implements OnInit, OnDestroy {
    public loginForm: UntypedFormGroup;
    public isAuthLoading = false;
    public isGoogleLoading = false;
    public isFacebookLoading = false;

    isLogged: boolean;
    tokenDTO: TokenDto;
    blockingui: boolean


    constructor(
        public app: AppComponent,
        private renderer: Renderer2,
        private appService: AppService,
        private router: Router,
        private tokenService: TokenService,
    ) {
    }

    ngOnInit() {
        this.loginForm = new UntypedFormGroup({
            username: new UntypedFormControl(null, Validators.required),
            password: new UntypedFormControl(null, Validators.required)
        });

        this.blockingui = false;
    }

    get f() {
        return this.loginForm.controls;
    }


    loginByAuth() {

        this.blockingui = true

        const loginRequest = new LoginRequestDto();
        loginRequest.nombreUsuario = this.f.username.value;
        loginRequest.contrasenia = this.f.password.value;
        if (this.loginForm.valid) {
            this.isAuthLoading = true;
            this.appService.loginByAuth(loginRequest).subscribe({
                next: data => {
                    this.tokenDTO = data;
                },
                complete: () => {
                    this.tokenService.setToken(this.tokenDTO.accessToken);
                    this.tokenService.saveRefreshToken(this.tokenDTO.refreshToken);
                    this.tokenService.setCurrentUser(this.tokenDTO.username);
                    this.tokenService.setRoles(JSON.stringify(this.tokenDTO.roles));
                    this.tokenService.setResponseAuth(JSON.stringify(this.tokenDTO));

                    this.appService.userLogged = true;


                    this.router.navigate(['/pages/dashboard']).then(() => {
                            this.appService.msgInfoDetail(severities.INFO, 'LOGIN', 'Bienvenido !.');
                        }
                    );

                    this.blockingui = false
                },
                error: error => {
                    console.log('ERROR', error);
                    if (error.error.codigoRespuestaValue === 409) {
                        this.appService.msgInfoDetail(severities.WARNING, 'LOGIN', error.error.codigoRespuestaValue + ':Usuario o Password inválidos');
                    } else {
                        this.appService.msgInfoDetail(severities.ERROR, 'LOGIN', 'Ha ocurrido un error');
                    }

                    this.blockingui = false
                }
            });
            this.isAuthLoading = false;

        } else {
            this.appService.msgInfoDetail(severities.ERROR, 'Formulario invalido', 'error: ');
            this.blockingui = false
        }
    }

    register() {
        this.router.navigate(['/register']);
    }

    logOut(): void {
        this.blockingui = true
        this.appService.logout();
        this.isGoogleLoading = false;
        this.isLogged = false;
        this.blockingui = false

    }

    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
}
