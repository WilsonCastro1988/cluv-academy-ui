const serviceTutor = 'Tutor/'
const serviceCluv = 'Club/'
const serviceClase = 'Clase/'

const senseiEndpoints = {
    listarAllTutoresLanding: serviceTutor + "listarAllTutoresLanding",
}

const cluvsEndpoints = {
    listarAllCluvsLanding: serviceCluv + "listarAllClubsLanding",
}

const claseEndpoints = {
    listarAllClasesLanding: serviceClase + "listarAllClasesLanding",
    listarAll: serviceClase + "listar",
    findById: serviceClase + "buscarPorId/",
}
export {
    senseiEndpoints,
    cluvsEndpoints,
    claseEndpoints
}
