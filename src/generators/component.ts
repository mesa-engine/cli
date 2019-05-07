import * as _ from 'lodash'
import * as path from 'path'
import * as Generator from 'yeoman-generator'
import yosay = require('yosay')

import {Options} from '../commands/component'
import { Utils } from '../utils';

const {version} = require('../../package.json')

class ComponentGenerator extends Generator {
  pjson!: any
  utils = new Utils();

  get _path() { return `${this.utils.toKebabCase(this.options.name)}.component.ts` }
  get _mocha() { return this.pjson.devDependencies.mocha }

  constructor(args: any, public options: Options) {
    super(args, options)
  }

  async prompting() {
    this.pjson = this.fs.readJSON('package.json')
    if (!this.pjson) throw new Error('not in a project directory')
    this.pjson.oclif = this.pjson.oclif || {}
    this.log(yosay(`Adding a component to ${this.pjson.name} Version: ${version}`))
  }

  writing() {
    this.sourceRoot(path.join(__dirname, '../../templates'))
    let bin = this.pjson.oclif.bin || this.pjson.oclif.dirname || this.pjson.name
    if (bin.includes('/')) bin = bin.split('/').pop()
    const cmd = `${bin} ${this.options.name}`
    const componentPath = this.destinationPath(`src/components/${this._path}`)
    const opts = {...this.options, bin, cmd, _, type: 'component', path: componentPath, name: `${this.utils.toCapitalCase(this.options.name)}Component`}
    this.fs.copyTpl(this.templatePath(`component.ejs`), componentPath, opts)
    
    const importLine = `export * from './${this.utils.toKebabCase(this.options.name)}.component';\n`;
    if(this.fs.exists(this.destinationPath(`src/components/index.ts`))) {
      let current = this.fs.read(this.destinationPath(`src/components/index.ts`), importLine);
      this.fs.write(this.destinationPath(`src/components/index.ts`), `${current}${importLine}`,);
    } else {
      this.fs.write(this.destinationPath(`src/components/index.ts`), importLine);
    }
    if (this._mocha) {}
  }

  end() {}
}

export = ComponentGenerator