import {expect, test} from '@oclif/test'

describe('Generate', () => {
  test
    .stdout()
    .command(['g'])
    .it('runs generate', ctx => {
      //expect(ctx.stdout).to.contain('hello world')
      console.log(ctx.stdout);
    })
})
