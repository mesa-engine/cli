import * as Generator from 'yeoman-generator';
import { Options } from '../commands/component';
import { Utils } from '../utils';

class NewGenerator extends Generator {
  pjson!: any
  utils = new Utils();

  constructor(args: any, public options: Options) {
    super(args, options)
  }

  async prompting() {
    this.utils.promptNewApplication(this);
  }

  writing() {
    this.utils.generateNewProject(this);
  }

  end() {}
}

export = NewGenerator