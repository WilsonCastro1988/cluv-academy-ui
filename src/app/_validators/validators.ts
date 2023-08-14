import {AbstractControl, FormControl, ValidatorFn, Validators} from '@angular/forms';

export function customEmailValidator(control: FormControl) {
    const email = control.value;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = regex.test(email);
    return isValid ? null : { invalidEmail: true };
}

export function customTelfValidator(control: FormControl) {
    const telf = control.value;
    const regex = /^\d{9,10}$/;
    const isValid = regex.test(telf);
    return isValid ? null : { invalidTelf: true };
}

export function customMobileValidator(control: FormControl) {
    const mobile = control.value;
    const regex = /^\d{10}$/;
    const isValid = regex.test(mobile);
    return isValid ? null : { invalidMobile: true };
}

export function customTelfExtValidator(control: FormControl) {
    const telfExt = control.value;
    const regex = /^\d{1,4}$/;
    const isValid = regex.test(telfExt);
    return isValid ? null : { invalidTelfExt: true };
}

export function customUrlValidator(control: FormControl) {
    const url = control.value;
    let validProtocol = true;
    if (!url) {
        return null; // Si el campo está vacío, no se valida nada
    }
   /* const protocol = new URL(url).protocol;
    if (protocol === 'https:' || protocol === 'http:') {
        validProtocol = false; // Si el protocolo no es HTTPS, se retorna un objeto con la clave 'false'
    }
    */
    const regex = /^((http|https):\/\/)?([a-z0-9-]+\.)+[a-z]{2,63}(:[0-9]{1,5})?(\/[^\s]*)?$/i;
    const isValid = regex.test(url);
    return isValid ? null : { invalidUrl: true };
}


export function noSpecialCharactersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        if (!value) {
            return null; // Si el campo está vacío, no se valida nada
        }
        const pattern = Validators.pattern(
            // Expresión regular para validar que no hay caracteres especiales
            /^[a-zA-Z0-9\s]*$/
        );
        return pattern(control); // Validamos el valor del campo utilizando Validators.pattern
    };
}
