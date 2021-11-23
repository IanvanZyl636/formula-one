# FormulaOne :checkered_flag:

<img  src="/sample/sample-gif.gif?raw=true">

### This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.2.

## Clone

```$xslt
git clone https://github.com/IanvanZyl636/formula-one.git
cd formula-one
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Libraries

### Production dependencies

<a href="https://github.com/FortAwesome/angular-fontawesome">angular-fontawesome</a> - Official Angular component for Font Awesome 5+ to add any free font awesome icon

<a href="https://getbootstrap.com/">Minified compiled bootstrap css</a> - Adds all bootstrap css for website without adding the entire library

### Development and CI/CD dependencies

<a href="https://prettier.io/">prettier</a> - An opinionated code formatter

<a href="https://eslint.org/">eslint</a> - ESLint statically analyzes your code to quickly find problems.

<a href="https://typicode.github.io/husky/#/">husky</a> - Allows to run package scripts when commiting to repo. For this project I use husky to run prettier and eslint when committing the repo

<a href="https://github.com/angular-schule/angular-cli-ghpages">angular-cli-ghpages</a> - Deploy your Angular app to GitHub pages directly from the Angular CLI. (ng deploy)

## Approach

### Ergast api

Integrated with the ergast api inside src > app > integration > ergast.

All api related models are added inside the integration folder(src > app > integration > ergast > models).

All api request are called with angular's HttpClientModule.

To test the api there are JSON file mocks (src > mocks > edgast) to excercise the provider.

### Base Components

`async-component.class` => This is a base class which is ment to be extended by other components to gain the `_apiRequest()` function. This function is a wrapped for any requests to toggle the `isLoading` flag for that specific component. It will also call `ngDestroy` when you navigate off the component and unsubscribe to any requests made through the `_apiRequest()` wrapper.

### Components

`nav-menu.component` => Contains the main navigation menu for the website. It will switch between `main-menu.component` and `mobile-menu.component` depending on the size of the browser giving a responsive menu. It also has a list of menu items so it can be updated in one place and pulled through on both the main `main-menu.component` and `mobile-menu.component`

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
