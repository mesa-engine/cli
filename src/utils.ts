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
}

export enum ClassType {
    component = 'component',
    system = 'system',
    blueprint = 'blueprint'
}