@mesa-engine/cli
================
[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@mesa-engine/cli.svg)](https://npmjs.org/package/@mesa-engine/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@mesa-engine/cli.svg)](https://npmjs.org/package/@mesa-engine/cli)
[![License](https://img.shields.io/npm/l/@mesa-engine/cli.svg)](https://github.com/indiebash/cli/blob/master/package.json)

# Installation
```sh
$ npm install -g @mesa-engine/cli
```

# Usage
Creating and running a new application
```sh
$ mesa new my-app
$ cd my-app
$ npm install
$ mesa run
```

Once the project has been generated, you can use the cli to create new components, systems, and blueprints.

For example, creating a position component:
```sh
$ mesa component position
```
Would create a PositionComponent class in the src/components folder.

If you wish to nest elements in sub-folders simply add slashes:
```sh
$ mesa component physics/velocity
```
Which would create a VelocityComponent class in src/components/physics/.

# Commands
Command | Description
--- | ---
new [name] | Creates a new mesa project
component [name] | Creates a new component
system [name] | Creates a new system
blueprint [name] | Creates a new blueprint
run | Builds and runs application

The "run" command will host your code and watch for any changes made. If change is detected it will rebuild and refresh the application.

At any point you can type the "help" command for details.
```sh
$ mesa help
...
$ mesa [command] --help
...
```