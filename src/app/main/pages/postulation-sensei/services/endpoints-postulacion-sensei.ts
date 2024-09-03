const serviceName = 'Tutor/'
const serviceClase = 'Clase/'

const senseiEndpoints = {
    listarAll: serviceName + 'listar',
    findById: serviceName + 'buscarPorId/',
    listarAllTutoresLanding: serviceName + "listarAllTutoresLanding",
    listarTutorPostulante: serviceName + 'listarTutorPostulante',
    clasesMeetPoridTutor: serviceClase + 'clasesMeetPoridTutor/',
    guardar: serviceName + 'guardar',
    buscarTutorPorIdUsuario: serviceName + 'buscarPorIdUsuario/',
    buscarUsuarioPorIdTutor: 'buscarPorIdTutor/',

}
export {
    senseiEndpoints,
}

