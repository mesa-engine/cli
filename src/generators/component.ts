import * as Generator from 'yeoman-generator';
import { Options } from '../commands/component';
import { Utils, ClassType } from '../utils';

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