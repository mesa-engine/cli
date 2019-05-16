import * as _ from 'lodash'
import * as path from 'path'
import * as Generator from 'yeoman-generator'
import yosay = require('yosay')

import {Options} from '../commands/system'
import { Utils } from '../utils';

const {version} = require('../../package.json')

class SystemGenerator extends Generator {
  pjson!: any
  utils = new Utils();

  get _path() { return `${this.utils.toKebabCase(this.options.name)}.system.ts` }
  get _mocha() { return this.pjson.devDependencies.mocha }

  constructor(args: any, public options: Options) {
    super(args, options)
  }

  async prompting() {
    this.pjson = this.fs.readJSON('package.json')
    if (!this.pjson) throw new Error('not in a project directory')
    this.pjson.oclif = this.pjson.oclif || {}
    this.log(yosay(`Adding a system to ${this.pjson.name} Version: ${version}`))
  }

  writing() {
    this.sourceRoot(path.join(__dirname, '../../templates'))
    let bin = this.pjson.oclif.bin || this.pjson.oclif.dirname || this.pjson.name
    if (bin.includes('/')) bin = bin.split('/').pop()
    
    // Create new system.
    const cmd = `${bin} ${this.options.name}`
    const systemPath = this.destinationPath(`src/systems/${this._path}`)
    const opts = {...this.options, bin, cmd, _, type: 'system', path: systemPath, name: `${this.utils.toCapitalCase(this.options.name)}System`}
    this.fs.copyTpl(this.templatePath(`system.ejs`), systemPath, opts)
    
    // Add export to index.ts
    const importLine = `export * from './${this.utils.toKebabCase(this.options.name)}.system';\n`
    if(this.fs.exists(this.destinationPath(`src/systems/index.ts`))) {
      let current = this.fs.read(this.destinationPath(`src/systems/index.ts`), importLine);
      this.fs.write(this.destinationPath(`src/systems/index.ts`), `${current}${importLine}`,);
    } else {
      this.fs.write(this.destinationPath(`src/systems/index.ts`), importLine);
    }
    if (this._mocha) {}
  }

  end() {}
}

export = SystemGenerator