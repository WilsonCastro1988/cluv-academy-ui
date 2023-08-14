export class TokenDto {
    refreshToken: string;
    id: number;
    username: string;
    cedula: string;
    roles: [] = [];
    tokenType: string = "Bearer";
    accessToken: string;
}
