import * as Generator from 'yeoman-generator';
import { Options } from '../commands/component';
import { Utils, ClassType } from '../utils';

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