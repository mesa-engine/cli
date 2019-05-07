export class Utils {
    toKebabCase(str: string) {
        return str && 
        str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(x => x.toLowerCase())
        .join('-');
    }

    private kebabToCapital(str: string) {
        return str.split('-').map(x => x.charAt(0).toUpperCase()+x.slice(1)).join('');
    }

    toCapitalCase(str: string) {
        return this.kebabToCapital(this.toKebabCase(str));
    }
}