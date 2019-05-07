import {flags} from '@oclif/command'

import Base from '../command-base'

export interface Options {
  name: string
}

export default abstract class ComponentCommand extends Base {
  static description = 'Create a new component'

  static flags = {}

  static args = [
    {name: 'name', description: 'name of component', required: true}
  ]

  async run() {
    const {flags, args} = this.parse(ComponentCommand)
    await super.generate('component', {
      name: args.name,
      force: true
    } as Options)
  }
}