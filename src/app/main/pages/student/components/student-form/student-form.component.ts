import {Component, OnInit} from '@angular/core';
import {StudentDto} from "../../model/studentDto";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ApiService} from "../../../../../_service/api.service";
import {accessType} from "../../../../../_enums/constDomain";
import {endpointsStudent} from "../../services/endpoints-student";

@Component({
    selector: 'app-student-form',
    templateUrl: './student-form.component.html',
    styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

    endPoint = accessType.typePrivate

    estudiantes: StudentDto[];
    estudianteForm: FormGroup;
    modoEdicion = false;
    displayModal = false; // Controla la visibilidad del modal

    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.initEstudianteForm();
        this.cargarEstudiantes();
    }

    initEstudianteForm(): void {
        this.estudianteForm = this.formBuilder.group({
            idEstudiante: null,
            idUsuarioEstudiante: '',
            activoEstudiante: false,
            idEstadoEstudiante: null,
            carritoComprasCollectionDto: [],
        });
    }

    cargarEstudiantes(): void {
        this.apiService.getAll().subscribe((estudiantes) => {
            this.estudiantes = estudiantes;
        });
    }

    guardarEstudiante(): void {
        const formData = this.estudianteForm.value;
        this.apiService.endpoint = this.endPoint + endpointsStudent.guardar
        if (this.modoEdicion) {
            this.apiService
                .saveObject(formData)
                .subscribe(() => {
                    this.cargarEstudiantes();
                    this.limpiarFormulario();
                });
        } else {
            this.apiService.saveObject(formData).subscribe(() => {
                this.cargarEstudiantes();
                this.limpiarFormulario();
            });
        }
    }

    editarEstudiante(estudiante: StudentDto): void {
        this.estudianteForm.setValue(estudiante);
        this.modoEdicion = true;
    }

    eliminarEstudiante(id: number): void {
        this.apiService.deleteObject(id).subscribe(() => {
            this.cargarEstudiantes();
        });
    }

    limpiarFormulario(): void {
        this.estudianteForm.reset();
        this.modoEdicion = false;
    }

    mostrarModal(): void {
        this.initEstudianteForm(); // Limpia el formulario antes de mostrarlo
        this.displayModal = true;
        this.modoEdicion = false;
    }
}

