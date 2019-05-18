import * as Generator from 'yeoman-generator';
import { Options } from '../commands/component';
import { Utils, ClassType } from '../utils';

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
  }

  end() {}
}

export = BlueprintGenerator