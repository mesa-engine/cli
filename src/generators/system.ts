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

  constructor(args: any, public options: Options) {
    super(args, options)
  }

  async prompting() {
    this.utils.promptGenerate(this, ClassType.system);
  }

  writing() {
    this.utils.generateFiles(this, ClassType.system);
  }

  end() {}
}

export = SystemGenerator