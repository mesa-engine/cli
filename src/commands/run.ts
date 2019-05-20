import Base from '../command-base';
const Bundler = require('parcel-bundler');

export default abstract class BlueprintCommand extends Base {
  static description = 'Run mesa application';

  async run() {
    await new Bundler('src/index.html', {}).serve();
  }
}