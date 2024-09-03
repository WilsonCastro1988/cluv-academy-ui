import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';


const TOKEN_KEY = 'AuthToken';
const CURRENTUSER_KEY = 'CurrentUser';
const ALTER_CURRENTUSER_KEY = 'AlterCurrentUser';
const REFRESHTOKEN_KEY = 'refreshToken';
const ROLES_KEY = 'roles';
const RESPONSEAUTH_KEY = 'ResponseAuth'

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor() {
    }

    public getRoles(): string {
        return sessionStorage.getItem(ROLES_KEY);
    }

    public setRoles(roles: string): void {
        sessionStorage.setItem(ROLES_KEY, roles);
    }

    public getResponseAuth(): string {
        return sessionStorage.getItem(RESPONSEAUTH_KEY);
    }

    public setResponseAuth(responseAuth: string): void {
        sessionStorage.setItem(RESPONSEAUTH_KEY, responseAuth);
    }

    public getToken(): string {
        return sessionStorage.getItem(TOKEN_KEY);
    }

    public setToken(token: string): void {
        sessionStorage.setItem(TOKEN_KEY, token);
    }

    public saveRefreshToken(token: string): void {
        sessionStorage.removeItem(REFRESHTOKEN_KEY);
        sessionStorage.setItem(REFRESHTOKEN_KEY, token);
    }

    public getRefreshToken(): string | null {
        return sessionStorage.getItem(REFRESHTOKEN_KEY);
    }

    public getCurrentUser(): string {
        let currentUser = sessionStorage.getItem(CURRENTUSER_KEY);
        return currentUser;
    }

    public setCurrentUser(socialUser: string): void {
        let socialUserEncript = socialUser;
        sessionStorage.setItem(CURRENTUSER_KEY, socialUserEncript);
    }

    public getAlterCurrentUser(): string {
        let alterCurrentUser = sessionStorage.getItem(ALTER_CURRENTUSER_KEY);
        return alterCurrentUser;
    }

    public setAlterCurrentUser(socialUser: string): void {
        let socialUserEncript = socialUser;
        sessionStorage.setItem(ALTER_CURRENTUSER_KEY, socialUserEncript);
    }

    encrypt(data) {
        var cryptoOut = CryptoJS.AES.encrypt(JSON.stringify(data), 'epn2022**').toString();
        return cryptoOut;
    }

    desencrypt(data) {
        var bytes = CryptoJS.AES.decrypt(data, "epn2022**");
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    }

    logOut(): void {
        sessionStorage.clear();
    }
}
