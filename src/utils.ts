import * as _ from 'lodash'
import * as Generator from 'yeoman-generator';
import * as path from 'path';
const chalk = require('chalk');

export class Utils {

  toKebabCase(str: string) {
    return str &&
      str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(x => x.toLowerCase())
        .join('-');
  }

  private kebabToCapital(str: string) {
    return str.split('-').map(x => x.charAt(0).toUpperCase() + x.slice(1)).join('');
  }

  toCapitalCase(str: string) {
    return this.kebabToCapital(this.toKebabCase(str));
  }

  uppercaseFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getFilePath(name: string, type: ClassType) {
    let path = name.split('/');
    path[path.length - 1] = `${this.toKebabCase(path[path.length - 1])}.${type}.ts`;
    return path.join('/');
  }

  getIndexPath(name: string, type: ClassType) {
    let path = name.split('/');
    if (path.length > 1) {
      path.pop();
      return `src/${type}s/${path.join('/')}/index.ts`;
    } else {
      return `src/${type}s/index.ts`;
    }
  }

  getExportPath(name: string, type: ClassType) {
    let path = name.split('/');
    return `export * from './${this.toKebabCase(path[path.length - 1])}.${type}';\n`;
  }

  getClassName(name: string, type: ClassType) {
    let path = name.split('/');
    return `${this.toCapitalCase(path[path.length - 1])}${this.uppercaseFirstLetter(type)}`;
  }

  getComponentPath(name: string) {
    return ['..', ...name.split('/')].reduce((previous, current, index) => {
      if (index === name.split('/').length) {
        return `${previous}/components`;
      } else {
        return `${previous}/..`;
      }
    });
  }

  setupTemplates(generator: Generator & { pjson: any }) {
    generator.sourceRoot(path.join(__dirname, '../templates'));
  }

  promptGenerate(generator: Generator & { pjson: any }, type: ClassType) {
    generator.pjson = generator.fs.readJSON('package.json');
    if (!generator.pjson) throw new Error('not in a project directory');
    generator.pjson.oclif = generator.pjson.oclif || {};

    this.setupTemplates(generator);
    this.promptMesaLogo(generator);
    generator.log(chalk.blueBright(`  Adding a ${type} to ${generator.pjson.name} \n`));
  }

  promptNewApplication(generator: Generator & { pjson: any }) {
    this.setupTemplates(generator);
    this.promptMesaLogo(generator);
    generator.log(chalk.blueBright(`\n Creating new project... \n`));
  }

  promptRunApplication(generator: Generator & { pjson: any }) {
    this.setupTemplates(generator);
    this.promptMesaLogo(generator);
    generator.log(chalk.blueBright(`\n Building application... \n`));
  }

  promptMesaLogo(generator: Generator) {
    let mesaText = generator.fs.read(generator.templatePath(`mesa.ejs`));
    generator.log(chalk.blueBright(`\n${mesaText}`));
  }

  generateFiles(generator: Generator & { pjson: any }, type: ClassType) {
    const filePath = generator.destinationPath(`src/${type}s/${this.getFilePath(generator.options.name, type)}`);
    let indexPath = this.getIndexPath(generator.options.name, type);
    const exportPath = this.getExportPath(generator.options.name, type);
    const className = this.getClassName(generator.options.name, type);

    generator.sourceRoot(path.join(__dirname, '../templates'));
    let bin = generator.pjson.oclif.bin || generator.pjson.oclif.dirname || generator.pjson.name;
    if (bin.includes('/')) bin = bin.split('/').pop();

    // Create new class
    const cmd = `${bin} ${generator.options.name}`;
    const opts = { ...generator.options, bin, cmd, _, type: type, path: filePath, name: className, componentsPath: this.getComponentPath(generator.options.name) };
    if(generator.fs.exists(filePath)) {
      throw new Error(`${this.toCapitalCase(type)} ${className} already exists`);
    } else {
      generator.fs.copyTpl(generator.templatePath(`${type}.ejs`), filePath, opts);
    }

    // Add export to index.ts
    indexPath = `src/${type}s`;
    let structure = generator.options.name.split('/');
    for (let i = 0; i < structure.length; i++) {
      if (i < structure.length - 1) {
        if (generator.fs.exists(generator.destinationPath(`${indexPath}/index.ts`))) {
          let current = generator.fs.read(generator.destinationPath(`${indexPath}/index.ts`), exportPath);
          if (!current.includes(`./${structure[i]}';`)) {
            generator.fs.write(generator.destinationPath(`${indexPath}/index.ts`), `${current}\nexport * from './${structure[i]}';\n`);
          }
        } else {
          generator.fs.write(generator.destinationPath(`${indexPath}/index.ts`), `export * from './${structure[i]}';\n`);
        }
        indexPath += `/${structure[i]}`;
      } else {
        if (generator.fs.exists(generator.destinationPath(`${indexPath}/index.ts`))) {
          let current = generator.fs.read(generator.destinationPath(`${indexPath}/index.ts`), exportPath);
          generator.fs.write(generator.destinationPath(`${indexPath}/index.ts`), `${current}${exportPath}`);
        } else {
          generator.fs.write(generator.destinationPath(`${indexPath}/index.ts`), exportPath);
        }
      }
    }
  }

  generateNewProject(generator: Generator) {
    generator.fs.copy(generator.templatePath(`starter`), this.toKebabCase(generator.options.name));
  }
}

export enum ClassType {
  component = 'component',
  system = 'system',
  blueprint = 'blueprint'
}