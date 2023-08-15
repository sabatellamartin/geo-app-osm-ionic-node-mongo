// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  storageDatabaseName: '__geoapp',
  storageSesionName: 'sesion',
  appPath: 'https://localhost/assets/app-release.apk',
  latDefault: -34.88,
  lonDefault: -56.17,
  zoomDefault: 14,
  apiUrl: 'http://localhost:5000/api',//'http://localhost:5000/api'
  version: '1.0',
  ADMINISTRADOR: 'ADMINISTRADOR',
  COMANDO: 'COMANDO',
  OPERACIONES: 'OPERACIONES',
  PATRULLA: 'PATRULLA'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
