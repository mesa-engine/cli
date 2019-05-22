"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var _ = require("lodash");
var path = require("path");
var chalk = require('chalk');
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.prototype.toKebabCase = function (str) {
        return str &&
            str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                .map(function (x) { return x.toLowerCase(); })
                .join('-');
    };
    Utils.prototype.kebabToCapital = function (str) {
        return str.split('-').map(function (x) { return x.charAt(0).toUpperCase() + x.slice(1); }).join('');
    };
    Utils.prototype.toCapitalCase = function (str) {
        return this.kebabToCapital(this.toKebabCase(str));
    };
    Utils.prototype.uppercaseFirstLetter = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    Utils.prototype.getFilePath = function (name, type) {
        var path = name.split('/');
        path[path.length - 1] = this.toKebabCase(path[path.length - 1]) + "." + type + ".ts";
        return path.join('/');
    };
    Utils.prototype.getIndexPath = function (name, type) {
        var path = name.split('/');
        if (path.length > 1) {
            path.pop();
            return "src/" + type + "s/" + path.join('/') + "/index.ts";
        }
        else {
            return "src/" + type + "s/index.ts";
        }
    };
    Utils.prototype.getExportPath = function (name, type) {
        var path = name.split('/');
        return "export * from './" + this.toKebabCase(path[path.length - 1]) + "." + type + "';\n";
    };
    Utils.prototype.getClassName = function (name, type) {
        var path = name.split('/');
        return "" + this.toCapitalCase(path[path.length - 1]) + this.uppercaseFirstLetter(type);
    };
    Utils.prototype.getComponentPath = function (name) {
        return ['..'].concat(name.split('/')).reduce(function (previous, current, index) {
            if (index === name.split('/').length) {
                return previous + "/components";
            }
            else {
                return previous + "/..";
            }
        });
    };
    Utils.prototype.promptGenerate = function (generator, type) {
        generator.pjson = generator.fs.readJSON('package.json');
        if (!generator.pjson)
            throw new Error('not in a project directory');
        generator.pjson.oclif = generator.pjson.oclif || {};
        generator.sourceRoot(path.join(__dirname, '../templates'));
        var test = generator.fs.read(generator.templatePath("mesa.ejs"));
        generator.log(chalk.blueBright("\n" + test));
        generator.log(chalk.blueBright("\n  Adding a " + type + " to " + generator.pjson.name + " \n"));
    };
    Utils.prototype.generateFiles = function (generator, type) {
        var filePath = generator.destinationPath("src/" + type + "s/" + this.getFilePath(generator.options.name, type));
        var indexPath = this.getIndexPath(generator.options.name, type);
        var exportPath = this.getExportPath(generator.options.name, type);
        var className = this.getClassName(generator.options.name, type);
        generator.sourceRoot(path.join(__dirname, '../templates'));
        var bin = generator.pjson.oclif.bin || generator.pjson.oclif.dirname || generator.pjson.name;
        if (bin.includes('/'))
            bin = bin.split('/').pop();
        // Create new class
        var cmd = bin + " " + generator.options.name;
        var opts = __assign({}, generator.options, { bin: bin, cmd: cmd, _: _, type: type, path: filePath, name: className, componentsPath: this.getComponentPath(generator.options.name) });
        if (generator.fs.exists(filePath)) {
            throw new Error(this.toCapitalCase(type) + " " + className + " already exists");
        }
        else {
            generator.fs.copyTpl(generator.templatePath(type + ".ejs"), filePath, opts);
        }
        // Add export to index.ts
        indexPath = "src/" + type + "s";
        var structure = generator.options.name.split('/');
        for (var i = 0; i < structure.length; i++) {
            if (i < structure.length - 1) {
                if (generator.fs.exists(generator.destinationPath(indexPath + "/index.ts"))) {
                    var current = generator.fs.read(generator.destinationPath(indexPath + "/index.ts"), exportPath);
                    if (!current.includes("./" + structure[i] + "';")) {
                        generator.fs.write(generator.destinationPath(indexPath + "/index.ts"), current + "\nexport * from './" + structure[i] + "';\n");
                    }
                }
                else {
                    generator.fs.write(generator.destinationPath(indexPath + "/index.ts"), "export * from './" + structure[i] + "';\n");
                }
                indexPath += "/" + structure[i];
            }
            else {
                if (generator.fs.exists(generator.destinationPath(indexPath + "/index.ts"))) {
                    var current = generator.fs.read(generator.destinationPath(indexPath + "/index.ts"), exportPath);
                    generator.fs.write(generator.destinationPath(indexPath + "/index.ts"), "" + current + exportPath);
                }
                else {
                    generator.fs.write(generator.destinationPath(indexPath + "/index.ts"), exportPath);
                }
            }
        }
    };
    return Utils;
}());
exports.Utils = Utils;
var ClassType;
(function (ClassType) {
    ClassType["component"] = "component";
    ClassType["system"] = "system";
    ClassType["blueprint"] = "blueprint";
})(ClassType = exports.ClassType || (exports.ClassType = {}));
