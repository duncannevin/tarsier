[![MIT License][license-badge]][LICENSE]

![alt text](ui/public/tarsier-img.jpg)

# Tarsier

> What is a Tarsier you ask? 
> A Tarsier is a small carnivorous primate. They are very meticulous and have some of the largest eyes to body size in all nature.

### What does the Tarsier have to do with this project?

> Glad you asked, nothing really other than the fact it is a neat animal. 

### The goal of this application?

> To learn mostly. But if we create the best dang code collaboration tool ever, that would be a bonus.
>
> This project aims to allow users to collaborate in an isolated development environment located on the server.
> We will be able to empower those who can only afford a chrome book to setup and develop in a virtual development
> environment. 
>
> This software will always be free to all people. Our real mission is to make it easier for all people to code
> in order to prepare them for the automated world. We will never offer premium services at a cost, all aspects of
> this software will be free.
>
> It is a myth that with automation comes less jobs. The truth is that those jobs are replaced by higher value, 
> safer jobs that offer a better future for all who do the work to get them.

## Development

### Version Summary

* [Play Framework: 2.8.0](https://www.playframework.com/documentation/2.8.x/Home)
* [React: 16.8.6](https://reactjs.org/)
* [Create React App: 2.1.8](https://github.com/facebookincubator/create-react-app)

## How to use it?

### Prerequisites

* [Node.js](https://nodejs.org/)
* [scala](https://www.scala-lang.org/download/)

### Let's get started,

* Fork or clone this repository.

* Used any of the following [SBT](http://www.scala-sbt.org/) commands which will intern trigger frontend associated npm scripts.

```
    sbt clean           # Clean existing build artifacts

    sbt stage           # Build your application from your project’s source directory

    sbt run             # Run both backend and frontend builds in watch mode

    sbt dist            # Build both backend and frontend sources into a single distribution artifact

    sbt test            # Run both backend and frontend unit tests
```

* This seed is not using [scala play views](https://www.playframework.com/documentation/2.6.x/ScalaTemplates). All the views and frontend associated routes are served via [React](https://reactjs.org/) code base under `ui` directory.

## Complete Directory Layout

```
├── /app/                                 # The backend (scala play) sources (controllers, models, services)
│     └── /controllers/                   # Backend controllers
│           └── FrontendController.scala  # Asset controller wrapper serving frontend assets and artifacts
├── /conf/                                # Configurations files and other non-compiled resources (on classpath)
│     ├── application.conf                # Play application configuratiion file.
│     ├── logback.xml                     # Logging configuration
│     └── routes                          # Routes definition file
├── /logs/                                # Log directory
│     └── application.log                 # Application log file
├── /project/                             # Contains project build configuration and plugins
│     ├── FrontendCommands.scala          # Frontend build command mapping configuration
│     ├── FrontendRunHook.scala           # Forntend build PlayRunHook (trigger frontend serve on sbt run)
│     ├── build.properties                # Marker for sbt project
│     └── plugins.sbt                     # SBT plugins declaration
├── /public/                              # Frontend build artifacts will be copied to this directory
├── /target/                              # Play project build artifact directory
│     ├── /universal/                     # Application packaging
│     └── /web/                           # Compiled web assets
├── /test/                                # Contains unit tests of backend sources
├── /ui/                                  # React frontend source (based on Create React App)
│     ├── /public/                        # Contains the index.html file
│     ├── /node_modules/                  # 3rd-party frontend libraries and utilities
│     ├── /src/                           # The frontend source codebase of the application
│     ├── .editorconfig                   # Define and maintain consistent coding styles between different editors and IDEs
│     ├── .gitignore                      # Contains ui files to be ignored when pushing to git
│     ├── package.json                    # NPM configuration of frontend source
│     ├── README.md                       # Contains all user guide details for the ui
│     └── yarn.lock                       # Yarn lock file
├── .gitignore                            # Contains files to be ignored when pushing to git
├── build.sbt                             # Play application SBT configuration
├── LICENSE                               # License Agreement file
├── README.md                             # Application user guide
└── ui-build.sbt                          # SBT command hooks associated with frontend npm scripts 
```

## What is new in here?

### FrontendCommands.scala

* Frontend build command mapping configuration.

```
    ├── /project/
    │     ├── FrontendCommands.scala
```


### FrontendRunHook.scala

* PlayRunHook implementation to trigger ``npm run start`` on ``sbt run``.

```
    ├── /project/
    │     ├── FrontendRunHook.scala
```

### FrontendController.scala

* Asset controller wrapper serving frontend assets and artifacts.

```
    ├── /app/                                 
    │     └── /controllers/                   
    │           └── FrontendController.scala
```

### ui-build.sbt

* This file contains the build task hooks to trigger frontend npm scripts on sbt command execution.

### npm run commands

* New and modified npm scripts of [Create React App](https://github.com/facebookincubator/create-react-app) generated package.json.
* Check [UI README.md](./ui/README.md) to see all available frontend build tasks.

```
├── /ui/                       
│     ├── package.json          
```

## Routes

```
├── /conf/      
│     ├── routes
```

* The following route configuration map index.html to entry route (root). This should be placed as the initial route.

```
GET        /             controllers.FrontendController.index()
```

* All API routes should be prefixed with API prefix defined under ``application.conf`` (Default prefix ``apiPrefix = "api"``) 

Example API route:

```
GET        /api/summary  controllers.HomeController.appSummary
```

* The following route is being used to serve frontend associated build artifacts (css, js) and static assets (images, etc.). This should be placed as the final route.

```
GET        /*file        controllers.FrontendController.assetOrDefault(file)
```

**Note: _On production build all the front end React build artifacts will be copied to the `public` folder._**
