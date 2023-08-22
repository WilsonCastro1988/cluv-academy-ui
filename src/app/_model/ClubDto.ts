import {ReconocimientoClubDto} from "./ReconocimientoClubDto";

export class ClubDto {

    idClub: number;
    nombreClub: string;
    descripcionClub: string;
    objetivosClub: string;
    introduccionClub: string;
    avatarClub: string;
    activoClub: boolean;
    foroClubCollectionDto: any[];
    idReconocimientoClubDto: ReconocimientoClubDto;
    materiaCollectionDto: any[];
    calificacionClubCollectionDto: any[];
}
