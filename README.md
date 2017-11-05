

# NGX Dynamic Dashboard Framework

> Note: This project is under heavy construction and is not intended for general production use yet. As such, we are not accepting bugs at the moment and documentation is quite lacking.

This is an angular 4+ based dashboard framework that is inspired by JIRA's dashboard implementation and https://github.com/angular-dashboard-framework/angular-dashboard-framework

The primary projects leveraged:
* ngx  - https://angularjs.org/
* ngx-charts (angular based d3 charts) - https://github.com/swimlane/ngx-charts
* Semantic-UI - https://semantic-ui.com/
* ng2-dnd drag and drop - https://github.com/akserg/ng2-dnd
* angular material

Features:
* Leverages Angular's dynamic data driven forms approach for gadget property pages and properties - https://angular.io/guide/dynamic-form
* Dynamic component strategy for creating gadget instances during runtime - https://angular.io/guide/dynamic-component-loader
* Faceted gadget search approach leveraging tags
* Support multiple board creation
* Drag and Drop support
* Multiple Data Source/Endpoint management
* Web Socket support
* Completely customizable and configurable

## Sample Board 1
![Image of Main Screen](https://github.com/catalogicsoftware/Angular-2-Dashboard-Framework/blob/master/documentation/images/sb1.png)

## Sample Board 2
![Image of Main Screen](https://github.com/catalogicsoftware/Angular-2-Dashboard-Framework/blob/master/documentation/images/sb2.png)

## Add Gadget
![Image of Add Gadget To Screen](https://github.com/catalogicsoftware/Angular-2-Dashboard-Framework/blob/master//documentation/gifs/add.gif)

## Add Board/Drag and Drop
![Image of Add Board To Screen](https://github.com/catalogicsoftware/Angular-2-Dashboard-Framework/blob/master//documentation/gifs/add-board.gif)

## Facet Filter
![Image of Filter Board To Screen](https://github.com/catalogicsoftware/Angular-2-Dashboard-Framework/blob/master//documentation/gifs/filter.gif)


# NgADF

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.0.

## Setup

Clone this repository then run `npm install`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Source Code Documentation

This project uses the compodoc project : https://github.com/compodoc/compodoc

Run `npm install -g @compodoc/compodoc` to install compodoc globally

Run `compodoc -p tsconfig.json -n 'NGX Dynamic Dashboard Framework'` to generate the documentation. It will be placed in the documentation folder

Run `compodoc -s` to serve up the documentation site at http://localhost:8080


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

