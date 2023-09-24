const serviceClase = 'Clase/'
const serviceMateria = 'Materia/'
const serviceEstudiante = 'Estudiante/'
const serviceCarrito = 'CarritoCompras/'
const serviceFactura = 'Factura/'
const servicePagos = 'Pagos/'

const productEndpoints = {
    findById: serviceClase + "buscarPorId/",
    findMateriaById: serviceMateria + 'buscarPorId/',
    buscarPorNombreUsuario: 'buscarPorNombreUsuario/',
    buscarEstudiantePorIdUsuario: serviceEstudiante + 'buscarPorIdUsuario/',
    guardarCarrito: serviceCarrito + 'guardar',
    guardarFactura: serviceFactura + 'guardar',
    guardarPago: servicePagos + 'guardar',
    validarByIdClaseAndIdStudent: serviceCarrito + 'validarByIdClaseAndIdStudent/',
}

export {
    productEndpoints
}
