import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ClubDto} from "../../../../_model/academy/ClubDto";
import {TokenService} from "../../../../_service/token.service";
import {ApiService} from "../../../../_service/api.service";
import {AppService} from "../../../../_service/app.service";
import {Table} from "primeng/table";
import {accessType, severities} from "../../../../_enums/constDomain";
import {endpointsReconocimientoClub} from "../../reconocimiento-club/services/endpoints-reconocimiento-club";
import {endpointsClubes} from "../services/endpoints-clubes";
import {ReconocimientoClubDto} from "../../../../_model/academy/ReconocimientoClubDto";

@Component({
    selector: 'app-clubes',
    templateUrl: './clubes.component.html',
    styleUrls: ['./clubes.component.scss']
})
export class ClubesComponent implements OnInit {
    blockingui: boolean
    loading: boolean
    form: FormGroup;
    club: ClubDto = new ClubDto();
    listClub: ClubDto[] = []
    listSelectClub: ClubDto[] = []
    listReconocimientoClub: ReconocimientoClubDto[] = []

    imgURL: string = 'https://lusu.ca/resources/LUSU%20Albums/LUSU%20Logos/Clubs_LOGO.jpg';
    baseimgURL: string = 'https://lusu.ca/resources/LUSU%20Albums/LUSU%20Logos/Clubs_LOGO.jpg';
    prefijoBase64 = 'data:image/png;base64,';


    //para tabla
    exportColumns: any[];
    columnsHeader: any[];
    filterFields: any[];
    rowsPerPageOptions: any[] = [10, 25, 50, 75, 100];

    constructor(private tokenService: TokenService,
                private apiService: ApiService,
                private appService: AppService,
                private formBuilder: FormBuilder,) {
    }

    ngOnInit(): void {
        this.initForm()
        this.construirTabla()
        this.cargarLista()
        this.cargarListaReconocimiento()
    }

    initForm(): void {
        this.form = this.formBuilder.group({
            idClub: new FormControl('',),
            nombreClub: new FormControl('',),
            descripcionClub: new FormControl('',),
            objetivosClub: new FormControl('',),
            introduccionClub: new FormControl('',),
            avatarClub: new FormControl('',),
            activoClub: new FormControl('',),
            idReconocimientoClubDto: new FormControl('',),

        });
    }

    get f() {
        return this.form.controls
    }

    construirTabla() {
        this.columnsHeader = [
            {field: 'nombreClub', header: 'Club'},
            {field: 'descripcionClub', header: 'Descripcion'},
            {field: 'objetivosClub', header: 'Objetivo'},
            {field: 'introduccionClub', header: 'Introduccion'},
            {field: 'activoClub', header: 'Activo'},
            {field: 'idReconocimientoClubDto.nombreReconocimientoClub', header: 'Reconocimiento'},
        ];

        this.filterFields = [
            'nombreClub',
            'descripcionClub',
            'objetivosClub',
            'introduccionClub',
            'activoClub'
        ]

        this.exportColumns = this.columnsHeader.map(col => ({title: col.header, dataKey: col.field}));
        this.loading = false;
    }

    clear(table: Table) {
        table.clear();
    }

    cargarLista() {
        this.loading = true
        this.apiService.endpoint = accessType.typePrivate + endpointsClubes.listar
        this.apiService.getAll().subscribe({
            next: data => {
                this.listClub = data.listado
                this.loading = false
            },
            complete: () => {
                this.loading = false
            }, error: () => {
                this.loading = false
            }
        })
    }

    cargarListaReconocimiento() {
        this.loading = true
        this.apiService.endpoint = accessType.typePrivate + endpointsReconocimientoClub.listar
        this.apiService.getAll().subscribe({
            next: data => {
                this.listReconocimientoClub = data.listado
                this.loading = false
            },
            complete: () => {
                this.loading = false
            }, error: () => {
                this.loading = false
            }
        })
    }

    editItem(item) {
        this.club = {...item}
        this.form = this.formBuilder.group(this.club);
        this.f.idReconocimientoClubDto.setValue(this.listReconocimientoClub.find(item => item.idReconocimientoClub === this.club.idReconocimientoClubDto.idReconocimientoClub))
        this.f.avatarClub.setValue(item.avatarClub)
        this.imgURL = this.prefijoBase64 + this.f.avatarClub.value
    }

    guardar() {

        this.blockingui = true

        if (this.form.invalid) {
            this.appService.msgCheckInfoData()
            this.blockingui = false
        } else {
            this.club = this.form.value
            this.club.foroClubCollectionDto = null;
            this.club.materiaCollectionDto = null;
            this.club.calificacionClubCollectionDto = null;

            this.apiService.endpoint = accessType.typePrivate + endpointsClubes.guardar
            this.apiService.saveObject(this.club).subscribe({
                next: data => {
                    if (data.codigoRespuestaValue == 200) {
                        if (!this.club.idClub) {
                            this.appService.msgCreate()
                        } else {
                            this.appService.msgUpdate()
                        }

                        this.cargarLista()
                        this.cargarListaReconocimiento()

                    } else {
                        this.appService.msgInfoDetail(severities.WARNING, 'Info', 'Inconveninete al Guardar')
                    }
                },
                complete: () => {
                    this.blockingui = false
                },
                error: () => {
                    this.blockingui = false
                }
            })
        }
    }

    cancelar() {
        this.form.reset()
        this.initForm()
        this.cargarLista()
        this.cargarListaReconocimiento()

        this.imgURL = 'https://lusu.ca/resources/LUSU%20Albums/LUSU%20Logos/Clubs_LOGO.jpg';
        this.baseimgURL = 'https://lusu.ca/resources/LUSU%20Albums/LUSU%20Logos/Clubs_LOGO.jpg';
    }

    onFileSelected(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.convertFileToBase64(file);
            this.f.avatarClub.setValue(this.imgURL)
        } else this.imgURL = this.baseimgURL
    }

    convertFileToBase64(file: File): void {
        const reader = new FileReader();
        reader.onload = () => {
            this.imgURL = reader.result as string;
        };

        reader.readAsDataURL(file);
    }

    cancelChangeAvatar() {
        this.imgURL = this.baseimgURL
    }
}

