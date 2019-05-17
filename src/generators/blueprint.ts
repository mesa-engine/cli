import * as _ from 'lodash'
import * as path from 'path'
import * as Generator from 'yeoman-generator'
import yosay = require('yosay')

import {Options} from '../commands/blueprint'
import { Utils, ClassType } from '../utils';

const {version} = require('../../package.json')

class BlueprintGenerator extends Generator {
  pjson!: any
  utils = new Utils();

  get _blueprintPath() { return this.utils.getFilePath(this.options.name, ClassType.blueprint) }
  get _indexPath() { return this.utils.getIndexPath(this.options.name, ClassType.blueprint) }
  get _exportPath() { return this.utils.getExportPath(this.options.name, ClassType.blueprint) }
  get _className() { return this.utils.getClassName(this.options.name, ClassType.blueprint) }
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
    const blueprintPath = this.destinationPath(`src/blueprints/${this._blueprintPath}`)
    const componentsPath = this.getComponentPath();
    const opts = {...this.options, bin, cmd, _, type: 'blueprint', path: blueprintPath, name: this._className, componentsPath: componentsPath}
    this.fs.copyTpl(this.templatePath(`blueprint.ejs`), blueprintPath, opts)
    
    // Add export to index.ts
    if(this.fs.exists(this.destinationPath(this._indexPath))) {
      let current = this.fs.read(this.destinationPath(this._indexPath), this._exportPath);
      this.fs.write(this.destinationPath(this._indexPath), `${current}${this._exportPath}`,);
    } else {
      this.fs.write(this.destinationPath(this._indexPath), this._exportPath);
    }
    if (this._mocha) {}
  }

  // Blueprint template has an import for components.
  // Get path to components, taking into account sub folders.
  getComponentPath() {
    return ['..', ...this.options.name.split('/')].reduce((previous, current, index) => {
      if(index === this.options.name.split('/').length) {
        return `${previous}/components`;
      } else {
        return `${previous}/..`;
      }
    });
  }

  end() {}
}

export = BlueprintGenerator