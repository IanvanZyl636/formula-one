# FormulaOne :checkered_flag:

<img  src="/sample/sample-gif.gif?raw=true">

### This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.2.

## Approach

My Approach was to create a enterprise grade solution to achive this I implemented the following:
<ul>
  <li>
    Simple Store service for state management
  </li>
  <li>
    Husky to run prettier and eslint before each commit
  </li>
  <li>
    Github pipeline to run project tests and create a production build ready to be deployed
  </li>
  <li>
    Added angular-cli-ghpages to easily deploy prod build onto github pages
  </li>
</ul>
 

## Store

I wanted to integrate with a library like RxJs or Redux but decided against it because the current project is very small and you have to add a lot of boiler plate to integrate with those libraries. Instead I decided to implement my own angular singleton store service in order to keep the references pointing to same place so if the project grows and the need for RxJs or Redux is more apparent it will be easy to integrate with.

### Ergast api integration

Integrated with the ergast api inside `src > app > store > ergast`.

All api related models are added inside the integration folder(`src > app > store > ergast > models`).

All api request are called with angular's HttpClientModule.

To test the api there are JSON file mocks (`src > mocks > edgast`) to excercise the provider.

## Components

### Base Components

`async-component.base` => This is a base class which is meant to be extended by other components to gain the `protected` `_apiRequest()` function. This function is a wrapper for any requests to toggle the `isLoading` flag for that specific component. It will also call `ngDestroy` when you navigate off the component and unsubscribe to any requests made through the `_apiRequest()` wrapper making it easier to control memory leaks.

### Menu Component

`nav-menu.component` => Contains the main navigation menu for the website. It will switch between `main-menu.component` and `mobile-menu.component` depending on the size of the browser, giving a responsive menu. It also has a list of menu items so it can be updated in one place and pulled through on both the `main-menu.component` and `mobile-menu.component`

`main-menu.component` => Is just a template component which contains the layout for a full website menu view.

`mobile-menu.component` => Is just a template component which contains the layout for a mobile website menu view.

`menu-logo.component` => Is also a template component to display the website logo. Reason for it is if you want to change logo it only has to be done in one place

### Page Components

`page.component` => Is a wrapper component for any page components. It handles the loading spinner, `<h1>` heading for the page and you can center the content inside of it

`app-page-not-found` => Is a lazyloaded component when you enter the incorrect route it is setup with `path: '**', loadChildren: () => import('./components/page-not-found/page-not-found.module').then((m) => m.PageNotFoundModule),`. This wildcard path is used to trigger all non matching routes
  
`world-champions.component` => This is the home page component. It uses the `page.component` wrapper and triggers the loading spinner with its `isLoading` flag which it gets by extending the `async-component.base` and calling the api request using the `_apiRequest()` wrapper. When it gets its list of data it will generate a list of card components (`world-champion-card.component`).
  
`world-champion-card.component` => This is just a template component to display the world-champions in a unified card. It provides the routerLink to navigate to the season result page component. Makes it easy to edit the template for all world-champions passed to it.
  
`season-result.component` => This is a lazy loaded page component which is also wrapped by the `page.component`. When clicking on a `world-champion-card.component` it will pass in the season and driverId as url variables of the world champion and receive it by the `season-result.component`. The route setup for this is `path: 'season-result/:year/:driverId', loadChildren: () => import('./components/season-result/season-result.module').then( (m) => m.SeasonResultModule)` notice the `:year` and `:driverId` url variable in the route. The component will extract the url variables and make a request of its own which will trigger the base class `isLoading` flag and display the loading spinner. When the request is finished it will display a table with the results and highlight the rows where the winner's driverId matched the url driverId variable. If no driverId url variable is passed in the screen will still render without highlighting anything. You can also change the driverId to any driverId that is listed in the table and it will be highlighted.

### Fonts

The fonts are added at `src > fonts`. With new fonts their files are added in their own folder.

### CSS

In the folder `src > pre-process-styles` is shareable `.scss` files. 

`_fonts.scss` => is all the @font-face implementations for the font files we added above. 

`_variables.scss` => has general website theme variable colors to easily change and pull through entire website.

`_menu.scss` => is shared styling between the `main-menu.component` and `mobile-menu.component` to make it easy to change the website menu style.

The main shared styles is just in the `scr` folder.

`style.scss` => contains website wide share styles it also imports the fonts and variables to make it available for the website.

`bootstrap.min.css` => this is the minified compiled bootstrap css. which adds all bootstraps responsive style classes to the project without having to add the bootstrap npm package. Keeps the website light weight with this appoach. This file will be bundles with all the scss by webpack.



## Libraries

### Production dependencies

<a href="https://github.com/FortAwesome/angular-fontawesome">angular-fontawesome</a> - Official Angular component for Font Awesome 5+ to add any free font awesome icon

<a href="https://getbootstrap.com/">Minified compiled bootstrap css</a> - Adds all bootstrap css for website without adding the entire library. This makes it easier to create responsive websites

### Development and CI/CD dependencies

<a href="https://prettier.io/">prettier</a> - An opinionated code formatter

<a href="https://eslint.org/">eslint</a> - ESLint statically analyzes your code to quickly find problems.

<a href="https://typicode.github.io/husky/#/">husky</a> - Allows to run package scripts when commiting to repo. For this project I use husky to run prettier and eslint when committing the repo

<a href="https://github.com/angular-schule/angular-cli-ghpages">angular-cli-ghpages</a> - Deploy your Angular app to GitHub pages directly from the Angular CLI. (ng deploy)

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

## Deploy

Run `npm run deploy` to deploy `dist/` project onto github pages

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
