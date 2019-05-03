import { Command, flags } from '@oclif/command'
import * as fs from 'fs';

export default class Generate extends Command {
    static description = 'Generate components, systems, and blueprints'

    static examples = [
        `$ mesa generate c my-new-component`,
    ]

    static args = [{ name: 'type' }, { name: 'name' }];

    async run() {
        const { args, flags } = this.parse(Generate)

        if (args.name && args.type) {
            switch (args.type) {
                case 'c':
                case 'component':
                    this.log(`generating component`);
                    this.generateComponent(args.name);
                    break;
                default:
                    this.log(`The specified command ("${args.type}") is invalid. For a list of available options, run "mesa help".`);
            }
        }
    }

    generateComponent(name: string) {
        const kebabName = this.toKebabCase(name);
        const capitalName = this.kebabToCapital(kebabName);

        if (!fs.existsSync('src/components')) {
            fs.mkdirSync('src/components');
        }
        if (fs.existsSync(`src/components/${kebabName}.component.ts`)) {
            this.log(`Component ("${name}") already exists. Please use another name.`)
        } else {
            fs.appendFileSync(`src/components/${kebabName}.component.ts`, `export class ${capitalName}Component {}`);
            fs.appendFileSync(`src/components/index.ts`, `export * from './${kebabName}.component';\n`);
        }
    }

    toKebabCase(str: string) {
        return str && 
        str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(x => x.toLowerCase())
        .join('-');
    }

    kebabToCapital(str: string) {
        return str.split('-').map(x => x.charAt(0).toUpperCase()+x.slice(1)).join('');
    }
}
