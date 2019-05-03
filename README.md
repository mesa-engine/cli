@mesa-engine/cli
================



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@mesa-engine/cli.svg)](https://npmjs.org/package/@mesa-engine/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@mesa-engine/cli.svg)](https://npmjs.org/package/@mesa-engine/cli)
[![License](https://img.shields.io/npm/l/@mesa-engine/cli.svg)](https://github.com/indiebash/cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @mesa-engine/cli
$ cli COMMAND
running command...
$ cli (-v|--version|version)
@mesa-engine/cli/0.0.0 darwin-x64 node-v11.8.0
$ cli --help [COMMAND]
USAGE
  $ cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cli hello [FILE]`](#cli-hello-file)
* [`cli help [COMMAND]`](#cli-help-command)

## `cli hello [FILE]`

describe the command here

```
USAGE
  $ cli hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ cli hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/indiebash/cli/blob/v0.0.0/src/commands/hello.ts)_

## `cli help [COMMAND]`

display help for cli

```
USAGE
  $ cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_
<!-- commandsstop -->
