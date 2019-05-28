import Base from '../command-base';

export default abstract class RunCommand extends Base {
  static description = 'Run mesa application';

  async run() {
    const {flags, args} = this.parse(RunCommand)
    await super.generate('run', {});
  }
}