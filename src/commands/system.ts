import {flags} from '@oclif/command'

import Base from '../command-base'

export interface Options {
  name: string
}

export default abstract class SystemCommand extends Base {
  static description = 'Create a new system'

  static flags = {}

  static args = [
    {name: 'name', description: 'name of system', required: true}
  ]

  async run() {
    const {flags, args} = this.parse(SystemCommand)
    await super.generate('system', {
      name: args.name,
      force: true
    } as Options)
  }
}