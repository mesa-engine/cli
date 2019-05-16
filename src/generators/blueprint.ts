import * as _ from 'lodash'
import * as path from 'path'
import * as Generator from 'yeoman-generator'
import yosay = require('yosay')

import {Options} from '../commands/blueprint'
import { Utils } from '../utils';

const {version} = require('../../package.json')

class BlueprintGenerator extends Generator {
  pjson!: any
  utils = new Utils();

  get _path() { return `${this.utils.toKebabCase(this.options.name)}.Blueprint.ts` }
  get _mocha() { return this.pjson.devDependencies.mocha }

  constructor(args: any, public options: Options) {
    super(args, options)
  }

  async prompting() {
    this.pjson = this.fs.readJSON('package.json')
    if (!this.pjson) throw new Error('not in a project directory')
    this.pjson.oclif = this.pjson.oclif || {}
    this.log(yosay(`Adding a blueprint to ${this.pjson.name} Version: ${version}`))
  }

  writing() {
    this.sourceRoot(path.join(__dirname, '../../templates'))
    let bin = this.pjson.oclif.bin || this.pjson.oclif.dirname || this.pjson.name
    if (bin.includes('/')) bin = bin.split('/').pop()
    
    // Create new blueprint.
    const cmd = `${bin} ${this.options.name}`
    const blueprintPath = this.destinationPath(`src/blueprints/${this._path}`)
    const opts = {...this.options, bin, cmd, _, type: 'blueprint', path: blueprintPath, name: `${this.utils.toCapitalCase(this.options.name)}Blueprint`}
    this.fs.copyTpl(this.templatePath(`blueprint.ejs`), blueprintPath, opts)
    
    // Add export to index.ts
    const importLine = `export * from './${this.utils.toKebabCase(this.options.name)}.Blueprint';\n`;
    if(this.fs.exists(this.destinationPath(`src/blueprints/index.ts`))) {
      let current = this.fs.read(this.destinationPath(`src/blueprints/index.ts`), importLine);
      this.fs.write(this.destinationPath(`src/blueprints/index.ts`), `${current}${importLine}`,);
    } else {
      this.fs.write(this.destinationPath(`src/blueprints/index.ts`), importLine);
    }
    if (this._mocha) {}
  }

  end() {}
}

export = BlueprintGenerator