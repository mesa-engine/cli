import {flags} from '@oclif/command'

import Base from '../command-base'

export interface Options {
  name: string
}

export default abstract class BlueprintCommand extends Base {
  static description = 'Create a new blueprint'

  static flags = {}

  static args = [
    {name: 'name', description: 'name of blueprint', required: true}
  ]

  async run() {
    const {flags, args} = this.parse(BlueprintCommand)
    await super.generate('blueprint', {
      name: args.name,
      force: true
    } as Options)
  }
}