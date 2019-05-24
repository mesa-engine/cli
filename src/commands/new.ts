import Base from '../command-base';

export interface Options {
  name: string
}

export default abstract class NewCommand extends Base {
  static description = 'Create a new application';

  static flags = {}

  static args = [
    {name: 'name', description: 'name of application', required: true}
  ]

  async run() {
    const {flags, args} = this.parse(NewCommand)
    await super.generate('new', {
      name: args.name,
      force: false
    } as Options)
  }
}