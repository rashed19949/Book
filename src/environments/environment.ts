// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: 'http://localhost:5000/api/',

  firebaseConfig: {
    apiKey: "AIzaSyDZo84LxfztEpnZUxAG0umW5p3-Hbvxjl0",
    authDomain: "test-5e4dd.firebaseapp.com",
    projectId: "test-5e4dd",
    storageBucket: "test-5e4dd.appspot.com",
    messagingSenderId: "457229309509",
    appId: "1:457229309509:web:2c44ac947e5fea39b5352c"
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
