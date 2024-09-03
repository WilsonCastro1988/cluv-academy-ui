const serviceTutor = 'Tutor/'
const serviceCluvs = 'Club/'
const serviceMateria = 'Materia/'
const serviceClase = 'Clase/'
const serviceEstadoClase = 'EstadoClase/'
const serviceTipoClase = 'TipoClase/'
const serviceHorario = 'Horario/'
const serviceInfoAcademicaTutor = 'InfoAcademicaTutor/'
const serviceInfoBancariaTutor = 'InfoBancaria/'
const serviceInfoDestrezasTutor = 'InfoDestrezas/'
const serviceInfoMultimediaTutor = 'MultimediaTutor/'
const serviceHorarioSugeridoTutor = "HorarioSugeridoTutor/"


const senseiEndpoints = {
    listarAll: serviceTutor + 'listar',
    buscarTutorPorIdTutor: serviceTutor + 'buscarPorId/',


    listarInfoAcademicaTutorByUserName: serviceInfoAcademicaTutor + 'buscarPorNombreUsuario/',
    listarInfoAcademicaTutorByIdTutor: serviceInfoAcademicaTutor + 'buscarPorIdTutor/',
    guardarInfoAcademicaTutor: serviceInfoAcademicaTutor + 'guardar',

    listarInfoBancariaTutorByUserName: serviceInfoBancariaTutor + 'buscarPorNombreUsuario/',
    listarInfoBancariaTutorByIdTutor: serviceInfoBancariaTutor + 'buscarPorIdTutor/',
    guardarInfoBancariaTutor: serviceInfoBancariaTutor + 'guardar',

    listarInfoDestrezasTutorByUserName: serviceInfoDestrezasTutor + 'buscarPorNombreUsuario/',
    listarInfoDestrezasTutorByIdTutor: serviceInfoDestrezasTutor + 'buscarPorIdTutor/',
    guardarInfoDestrezasTutor: serviceInfoDestrezasTutor + 'guardar',

    listarInfoMultimediaTutorByUserName: serviceInfoMultimediaTutor + 'buscarPorNombreUsuario/',
    listarInfoMultimediaTutorByIdTutor: serviceInfoMultimediaTutor + 'buscarPorIdTutor/',
    guardarInfoMultimediaTutor: serviceInfoMultimediaTutor + 'guardar',


    listarAllTutoresLanding: serviceTutor + "listarAllTutoresLanding",
    guardar: serviceTutor + 'guardar',
    guardarClase: serviceClase + 'guardar',

    listarAllCluvs: serviceCluvs + 'listar',
    listarAllMateriaByIdClub: serviceMateria + 'listarByIdClub/',
    buscarTutorPorIdUsuario: serviceTutor + 'buscarPorIdUsuario/',
    buscarPorIdTipoClase: serviceTipoClase + 'buscarPorId/',
    listarAllTipoClase: serviceTipoClase + 'listar',
    buscarPorIdEstadoClase: serviceEstadoClase + 'buscarPorId/',
    horarioDefault: serviceHorario + 'otenerHorarioDefault',
    buscarPorNombreUsuario: 'buscarPorNombreUsuario/',
    guardarUsuario: 'guardarUsuario',
    actualizarUsuario: 'actualizarUsuario',
    validarUsuarioClave: 'validarUsuarioClave',

    findHorarioSugeridoByIdTutor: serviceHorarioSugeridoTutor + 'findByIdTutor/',
    guardarHorarioSugeridoTutor: serviceHorarioSugeridoTutor + 'guardar/'
}

const endpointToken = {
    create: 'api/zoom/create-token/oauth/'
}

const appZoomCredential = {
    accountId: 'dmrMvyu8RSOa-vvRiEs-1g',
    clientId: 'k8Xe6IaITlGd1GLKKSoHWg',
    clientSecret: 'SkrFuQadhG47Nb1tDn8QZ6mg3hODdAfF'
}

const endpointMeeting = {
    create: 'api/zoom/create-meeting/access-token2/',
    zakToken: 'api/zoom/createZakToken'
}
export {
    senseiEndpoints,
    endpointToken,
    endpointMeeting,
    appZoomCredential
}
