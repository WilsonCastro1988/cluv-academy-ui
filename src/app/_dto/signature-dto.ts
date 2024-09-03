export class SignatureDto {

    meetingNumber: string;
    role: number;
    expirationSeconds: number = 3600;

    constructor() {
    }

}
