import * as _ from 'lodash'
import * as path from 'path'
import * as Generator from 'yeoman-generator'
import yosay = require('yosay')

import { Options } from '../commands/component'
import { Utils, ClassType } from '../utils';

const {version} = require('../../package.json')

class ComponentGenerator extends Generator {
  pjson!: any
  utils = new Utils();

  constructor(args: any, public options: Options) {
    super(args, options)
  }

  async prompting() {
    this.utils.promptGenerate(this, ClassType.component);
  }

  writing() {
    this.utils.generateFiles(this, ClassType.component);
  }

  end() {}
}

export = ComponentGenerator