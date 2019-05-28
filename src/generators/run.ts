import * as Generator from 'yeoman-generator';
import { Options } from '../commands/component';
import { Utils } from '../utils';
const Bundler = require('parcel-bundler');

class RunGenerator extends Generator {
  pjson!: any
  utils = new Utils();

  constructor(args: any, public options: Options) {
    super(args, options)
  }

  async prompting() {
    this.utils.promptRunApplication(this);
    await new Bundler('src/index.html', {}).serve();
  }

  writing() {}

  end() {}
}

export = RunGenerator