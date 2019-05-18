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

  constructor(args: any, public options: Options) {
    super(args, options)
  }

  async prompting() {
    this.utils.promptGenerate(this, ClassType.blueprint);
  }

  writing() {
    this.utils.generateFiles(this, ClassType.blueprint);

    // // Add export to index.ts
    // let indexPath = 'src/blueprints';
    // let structure = this.options.name.split('/');
    // for(let i = 0; i < structure.length; i++) {
    //   if(i < structure.length - 1) {
    //     indexPath += `/${structure[i]}`;
    //     this.fs.write(this.destinationPath(`${this._indexPath}/index.ts`), this._exportPath);
    //   } else {
    //     if(this.fs.exists(this.destinationPath(this._indexPath))) {
    //       let current = this.fs.read(this.destinationPath(this._indexPath), this._exportPath);
    //       this.fs.write(this.destinationPath(this._indexPath), `${current}${this._exportPath}`,);
    //     } else {
    //       this.fs.write(this.destinationPath(this._indexPath), this._exportPath);
    //     }
    //   }
    // }
    // if (this._mocha) {}
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