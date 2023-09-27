const serviceTutor = 'Tutor/'
const serviceCluvs = 'Club/'
const serviceMateria = 'Materia/'
const serviceClase = 'Clase/'
const serviceEstadoClase = 'EstadoClase/'
const serviceTipoClase = 'TipoClase/'
const serviceHorario = 'Horario/'
const senseiEndpoints = {
    listarAll: serviceTutor + 'listar',
    listarAllTutoresLanding: serviceTutor + "listarAllTutoresLanding",
    guardar: serviceTutor + 'guardar',
    guardarClase: serviceClase + 'guardar',
    listarAllCluvs: serviceCluvs + 'listar',
    listarAllMateriaByIdClub: serviceMateria + 'listarByIdClub/',
    buscarTutorPorIdUsuario: serviceTutor + 'buscarPorIdUsuario/',
    buscarPorIdTipoClase: serviceTipoClase + 'buscarPorId/',
    listarAllTipoClase: serviceTipoClase + 'listar',
    buscarPorIdEstadoClase: serviceEstadoClase + 'buscarPorId/',
    horarioDefault: serviceHorario + 'otenerHorarioDefault'
}

const endpointToken = {
    create: 'api/zoom/create-token/oauth/'
}

const appZoomCredential = {
    accountId: 'GWu_4SJxQ4KkDjco2veiNQ',
    clientId: 'R4QSMptbQvOg9JGm4fxMw',
    clientSecret: 'ACNN9ZqxRwwu7ZAnnWkwQsah2oFX4fXa'
}

const endpointMeeting = {
    create: 'api/zoom/create-meeting/access-token2/'
}
export {
    senseiEndpoints,
    endpointToken,
    endpointMeeting,
    appZoomCredential
}
