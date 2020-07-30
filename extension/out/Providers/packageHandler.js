"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __importStar(require("vscode"));
const _4GLPackages_json_1 = __importDefault(require("./4GLPackages.json"));
function parsePackageClasses(importList, document, position) {
    let completions = [];
    let packages = _4GLPackages_json_1.default;
    importList.forEach(importName => {
        let index = packages.findIndex(element => element.package == importName);
        if (index < 0) {
            return;
        }
        packages[index].classes.forEach(importClass => {
            if (importClass.classMethods != null) {
                importClass.classMethods.forEach(methods => {
                    let prefix = "";
                    if (packages[index].package != "dataTypes") {
                        prefix += `${packages[index].package}.`;
                    }
                    prefix += `${importClass.class}.`;
                    if (isPrefixedBy(prefix, document, position)) {
                        let completer = new vscode.CompletionItem(methods.name, vscode.CompletionItemKind.Method);
                        completer.detail = methods.description;
                        completer.insertText = `${methods.name}(`;
                        if (typeof methods.parameters === 'undefined' || !methods.parameters.length) {
                            completer.insertText += ")";
                        }
                        completions.push(completer);
                    }
                });
            }
        });
    });
    return completions;
}
exports.parsePackageClasses = parsePackageClasses;
// Function to check if the current word is prefixed by the package name
// Only necessary for Class Methods
function isPrefixedBy(prefix, document, position) {
    let prefixes = false;
    let fullDocument = document.getText(new vscode.Range(new vscode.Position(0, 0), position));
    prefix = prefix.replace(/\./g, "\\s*\\.\\s*");
    let positionOffset = document.offsetAt(position);
    let wordPosition = fullDocument.search("\\w+$");
    let fullWord = fullDocument.substring(wordPosition, positionOffset);
    let prefixRegex = new RegExp(`(?<=${prefix})${fullWord}`, "i");
    if (prefixRegex.exec(fullDocument) != null) {
        prefixes = true;
    }
    return prefixes;
}
//# sourceMappingURL=packageHandler.js.map