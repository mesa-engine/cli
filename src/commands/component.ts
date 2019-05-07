import {flags} from '@oclif/command'

import Base from '../command-base'

export interface Options {
  name: string
  defaults?: boolean
  force?: boolean
}

export default abstract class AppComponent extends Base {
  static description = 'add a new component'

  static flags = {
    defaults: flags.boolean({description: 'use defaults for every setting'}),
    force: flags.boolean({description: 'overwrite existing files'}),
  }
  static args = [
    {name: 'name', description: 'name of component', required: true}
  ]

  async run() {
    const {flags, args} = this.parse(AppComponent)
    await super.generate('component', {
      name: args.name,
      defaults: flags.defaults,
      force: flags.force
    } as Options)
  }
}