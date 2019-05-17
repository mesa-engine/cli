import * as _ from 'lodash'
import * as path from 'path'
import * as Generator from 'yeoman-generator'
import yosay = require('yosay')

import {Options} from '../commands/system'
import { Utils, ClassType } from '../utils';

const {version} = require('../../package.json')

class SystemGenerator extends Generator {
  pjson!: any
  utils = new Utils();

  get _systemPath() { return this.utils.getFilePath(this.options.name, ClassType.system) }
  get _indexPath() { return this.utils.getIndexPath(this.options.name, ClassType.system) }
  get _exportPath() { return this.utils.getExportPath(this.options.name, ClassType.system) }
  get _className() { return this.utils.getClassName(this.options.name, ClassType.system) }
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
    const systemPath = this.destinationPath(`src/systems/${this._systemPath}`)
    const opts = {...this.options, bin, cmd, _, type: 'system', path: systemPath, name: this._className}
    this.fs.copyTpl(this.templatePath(`system.ejs`), systemPath, opts)
    
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

export = SystemGenerator