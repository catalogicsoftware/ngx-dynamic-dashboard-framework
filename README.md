
# NGX Dynamic Dashboard Framework

## Natural Language Processing (NLP) integration
![Image of Main Screen](https://github.com/catalogicsoftware/Angular-2-Dashboard-Framework/blob/master/documentation/gifs/nlp.gif)

## Sample Board 1
![Image of Main Screen](https://github.com/catalogicsoftware/Angular-2-Dashboard-Framework/blob/master/documentation/images/sb1.png)

## Add Board and Gadget 
![Image of Add Gadget To Screen](https://github.com/catalogicsoftware/Angular-2-Dashboard-Framework/blob/master//documentation/gifs/add.gif)

## Layout
![Image Layout](https://github.com/catalogicsoftware/Angular-2-Dashboard-Framework/blob/master//documentation/gifs/layout.gif)

## Alert/Notification
![Image Notification](https://github.com/catalogicsoftware/Angular-2-Dashboard-Framework/blob/master//documentation/gifs/notification.gif)

## Sample Realtime Web Socket Based Gadget
![Image of Add Gadget To Screen](https://github.com/catalogicsoftware/Angular-2-Dashboard-Framework/blob/master//documentation/gifs/websocket-realtime.gif)

## Sample Board 2
![Image of Main Screen](https://github.com/catalogicsoftware/Angular-2-Dashboard-Framework/blob/master/documentation/images/sb2.png)

## Drag and Drop
![Image of Add Board To Screen](https://github.com/catalogicsoftware/Angular-2-Dashboard-Framework/blob/master//documentation/gifs/drag-drop.gif)

## Facet Filter
![Image of Filter Board To Screen](https://github.com/catalogicsoftware/Angular-2-Dashboard-Framework/blob/master//documentation/gifs/filter.gif)



> Note: This project is under heavy construction and is not intended for general production use yet. As such, we are not accepting bugs at the moment and documentation is quite lacking.

This is an angular (ngx) based dashboard framework that is inspired by JIRA's dashboard implementation and https://github.com/angular-dashboard-framework/angular-dashboard-framework

The primary projects leveraged:
* ngx  - https://angularjs.org/
* ngx-charts (angular based d3 charts) - https://github.com/swimlane/ngx-charts
* Semantic-UI - https://semantic-ui.com/
* ng2-dnd drag and drop - https://github.com/akserg/ng2-dnd
* angular material
* AI Natural Language Processing - The board includes two options for AI, Wit.Ai and IBM Watson.
** Wit.ai - Natural Language Processing site has been integrated via JSONP
** IBM Watson - IBM Watson does not support JSONP so the code relies on a backend implementation of the IBM Watson SDK.
I offer sample backend code based on Spring Boot within the comments of the Runtime Service

Features:
* Leverages Angular's dynamic data driven forms approach for gadget property pages and properties - https://angular.io/guide/dynamic-form
* Dynamic component strategy for creating gadget instances during runtime - https://angular.io/guide/dynamic-component-loader
* Faceted gadget search approach leveraging tags
* Support multiple board creation
* Drag and Drop support
* Multiple Data Source/Endpoint management
* Web Socket support
* Completely customizable and configurable

# Getting Started Developing a Gadget

The code includes a very simple Todo gadget that can be used as an example for getting started developing your own gadget:

## Define the Gadget Component, Service and View

Todo Component: 
[todo-gadget.component.ts](https://github.com/catalogicsoftware/ngx-dynamic-dashboard-framework/src/app/gadgets/todo/todo-gadget.component.ts)

Todo View
[view.html](https://github.com/catalogicsoftware/ngx-dynamic-dashboard-framework/src/app/gadgets/todo/view.html)

Todo Service
[service.ts](https://github.com/catalogicsoftware/ngx-dynamic-dashboard-framework/src/app/gadgets/todo/service.ts)

Sample mock service data)

## Define the gadget's model

The model is used to dynamically create and render the gadget and its property page forms. This model is an entry into a model array used for all gadgets. You will simply add an entry to the model's array. See the Todo entry.

Add an entry for the gadget in the library model array
[gadget-library-model.json](https://github.com/catalogicsoftware/ngx-dynamic-dashboard-framework/src/assets/api/gadget-library-model.json)

## Add the gadget entry to the gadget factory class

Add an entry for your gadget in the factory gadget class
[gadget-factory.ts](https://github.com/catalogicsoftware/ngx-dynamic-dashboard-framework/src/app/add-gadget/gadget-factory.ts)

## Gadget Icon

Define an image/icon for your gadget
[todo.png](https://github.com/catalogicsoftware/ngx-dynamic-dashboard-framework/src/assets/images/todo.png)

## Gadget Module References

Import the gadget's component into the board module
[board.module.ts](https://github.com/catalogicsoftware/ngx-dynamic-dashboard-framework/src/app/board/board.module.ts)

Import the gadget's service into the grid module
[grid.module.ts](https://github.com/catalogicsoftware/ngx-dynamic-dashboard-framework/src/app/board/grid/grid.module.ts)

Import the gadget's component and service into the gadget module
[gadget.module.ts](https://github.com/catalogicsoftware/ngx-dynamic-dashboard-framework/src/app/gadgets/gadget.module.ts)


# NgADF

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.x.

## Setup

Clone this repository then run `npm install`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--aot --prod` flag for ahead of time compilation and production mode. 

The title of that issue suggests an issue with AOT but in my testing `--prod` seems to be the problem. 

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

