# UberUnitCode

AngularJS Unit Converter/Formula Solver Web Applicaton using Firebase.
This is a final project for Rose-Hulman CSSE280, written by myself.

***Check out the documentation and demonstration I submitted for this class here =>[Rose-Hulman Project Vault](https://rosehulmanprojectvault.org/project/-Mcae1Wvtehq-J4saaLz)***

## Libraries

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.2.
I also use the following libraries (Available via NPM)

- [Material Design Bootstrap 5] <http://mdboostrap.io>
- [Angular Material] <https://material.angular.io/>
- [Angular Fire for Firebase] <http://github.com/angular/angularfire>
- [ng-katex] <https://www.npmjs.com/package/ng-katex>
- [ng-select] <https://github.com/ng-select/ng-select>

## Features

UberUnit has the following features planned:

- Unit Conversion For Length, Area, Velocity, Pressure, Temperature
- Firebase Authentication for Calculation History and Favorite Formulas
- Mobile-First UI design for convenient User access
- Local Calculation Interface without API calls

## Development server
**NOTE**
Firebase functionality requires you to generate some keys and place them in the `src/environments/environment.ts` for API access. I have intentionally excluded them for security purposes, so you have to make your own Firebase app if you want to test the full functionality

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
