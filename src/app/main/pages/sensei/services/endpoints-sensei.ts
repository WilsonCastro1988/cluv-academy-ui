const serviceName = 'Tutor/'

const senseiEndpoints = {
    listarAll: serviceName + 'listar',
    listarAllTutoresLanding: serviceName+ "listarAllTutoresLanding",
    guardar: serviceName + 'guardar',
}

const endpointToken = {
    create: 'api/zoom/create-token/oauth/'
}

const appZoomCredential={
    accountId: 'GWu_4SJxQ4KkDjco2veiNQ',
    clientId: 'R4QSMptbQvOg9JGm4fxMw',
    clientSecret:'ACNN9ZqxRwwu7ZAnnWkwQsah2oFX4fXa'


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
