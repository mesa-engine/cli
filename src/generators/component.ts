import * as _ from 'lodash'
import * as path from 'path'
import * as Generator from 'yeoman-generator'
import yosay = require('yosay')

import {Options} from '../commands/component'
import { Utils, ClassType } from '../utils';

const {version} = require('../../package.json')

class ComponentGenerator extends Generator {
  pjson!: any
  utils = new Utils();

  get _componentPath() { return this.utils.getFilePath(this.options.name, ClassType.component) }
  get _indexPath() { return this.utils.getIndexPath(this.options.name, ClassType.component) }
  get _exportPath() { return this.utils.getExportPath(this.options.name, ClassType.component) }
  get _className() { return this.utils.getClassName(this.options.name, ClassType.component) }
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

    // Create new component
    const cmd = `${bin} ${this.options.name}`
    const componentPath = this.destinationPath(`src/components/${this._componentPath}`)
    const opts = {...this.options, bin, cmd, _, type: 'component', path: componentPath, name: this._className}
    this.fs.copyTpl(this.templatePath(`component.ejs`), componentPath, opts)
    
    // Add export to index.ts
    if(this.fs.exists(this.destinationPath(this._indexPath))) {
      let current = this.fs.read(this.destinationPath(this._indexPath), this._exportPath);
      this.fs.write(this.destinationPath(this._indexPath), `${current}${this._exportPath}`,);
    } else {
      this.fs.write(this.destinationPath(this._indexPath), this._exportPath);
    }
    if (this._mocha) {}
  }

  end() {}
}

export = ComponentGenerator