const typeDocument = {
    CEDULA_CIUDADANIA: {code: 'CC', name: 'Cédula de Ciudadanía'},
    TARJETA_IDENTIDAD: {code: 'TI', name: 'Tarjeta de Identidad'},
    PASAPORTE: {code: 'PAS', name: 'Pasaporte'},
    NIT: {code: 'NIT', name: 'Nit'},
    CEDULA_DE_EXTRANJERIA: {code: 'CE', name: 'Cedula de Extranjeria'},
    REGISTRO_CIVIL: {code: 'RC', name: 'Registro Civil'},
} as const

const states = {
    STATE_ACTIVE: {code: 'A', name: 'ACTIVO'},
    STATE_INACTIVE: {code: 'I', name: 'INACTIVO'}
}

const statesForLabo = [
    {code: 'ACTIVO', name: 'Activo'},
    {code: 'INACTIVO', name: 'Inactivo'}
]

const statesForEquipo = {
    STATE_DISPONIBLE: {code: '1', name: 'DISPONIBLE'},
    STATE_OCUPADO: {code: '2', name: 'EN OCUPADO'},
    STATE_MANTENIMIENTO: {code: '3', name: 'EN MANTENIMINETO'}
}
const severities = {
    INFO: 'info',
    WARNING: 'warn',
    ERROR: 'error',
}

const tipoEmpleado = {
    DOCENTE: 'DOCENTE',
    ADMINISTRATIVO: 'ADMINISTRATIVO'
}


const statesFisicoForEquipo = [
    {code: 'MUY BUENO', name: 'MUY BUENO'},
    {code: 'BUENO', name: 'BUENO'},
    {code: 'REGULAR', name: 'REGULAR'},
    {code: 'DEFICIENTE', name: 'DEFICIENTE'}
]


const statesFuncionalForEquipo = [
    {code: 'FUNCIONAL', name: 'FUNCIONAL'},
    {code: 'NO FUNCIONAL', name: 'NO FUNCIONAL'}
]


const statesForTipoEquipo = [
    {code: 'ACTIVO', name: 'Activo'},
    {code: 'INACTIVO', name: 'Inactivo'}
]


const accessType = {
    typePrivate: 'private/',
    typePublic: 'public/',
}

export {
    typeDocument,
    states,
    statesForLabo,
    severities,
    tipoEmpleado,
    statesForEquipo,
    statesFisicoForEquipo,
    statesFuncionalForEquipo,
    statesForTipoEquipo,
    accessType
}
