// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    HOST: 'http://localhost:8080',
    //HOST: 'http://24.144.80.40:8080',
    SIZEFILE: 1000000,
    ACCEPTFILES: '.pdf,.doc,.docx,.xls,.xlsx,.png,.jpeg',
    ARCHIVO_CONDICIONES_REGISTRO: 'https://www.secst.cl/upfiles/documentos/04042016_845pm_570326d2114b3.pdf',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
