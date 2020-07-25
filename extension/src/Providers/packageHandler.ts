import * as vscode from "vscode";
import generoPackages from "./4GLPackages.json";

interface Package extends Info {
    package: string;
    type: string;
    classes: PackageClass[]
}

interface PackageClass extends Info {
    class: string;
    objectMethods?: Method[];
    classMethods?: Method[];
}

interface Method extends Info {
    name: string;
    parameters?: Parameter[];
    returns?: Return[];
}

interface Info {
    description?: string;
    documentation?: string;
    minimumLanguageVersion?: string;
    maximumLanguageVersion?: string;
}

interface Parameter {
    name: string;
    type: string;
    description: string;
}

interface Return {
    type: string;
    description: string;
}

export function parsePackageClasses(importList: string[], document: vscode.TextDocument, position: vscode.Position) {
    let completions: vscode.CompletionItem[] = [];
    let packages: Package[] = generoPackages;
    importList.forEach(importName => {
        let index: number = packages.findIndex(element => element.package == importName);
        if (index < 0) {
            return;
        }
        packages[index].classes.forEach(importClass => {
            if (importClass.classMethods != null) {
                importClass.classMethods.forEach(methods => {
                    let prefix: string = "";
                    if (packages[index].package != "dataTypes") {
                        prefix += `${packages[index].package}.`;
                    }
                    prefix += `${importClass.class}.`;
                    if (isPrefixedBy(prefix, document, position)) {
                        let completer: vscode.CompletionItem = new vscode.CompletionItem(methods.name, vscode.CompletionItemKind.Method);
                        completer.detail = methods.description;
                        completer.insertText = `${methods.name}(`;
                        if (typeof methods.parameters === 'undefined' || !methods.parameters.length) {
                            completer.insertText += ")";
                        }
                        completions.push(completer);
                    }
                })
            }
        });
    });
    return completions;
}

// Function to check if the current word is prefixed by the package name
// Only necessary for Class Methods
function isPrefixedBy(prefix: string, document: vscode.TextDocument, position: vscode.Position) {
    let prefixes: boolean = false;
    let fullDocument: string = document.getText(new vscode.Range(new vscode.Position(0,0), position));
    prefix = prefix.replace(/\./g, "\\s*\\.\\s*");
    let positionOffset: number = document.offsetAt(position);
    let wordPosition: number = fullDocument.search("\\w+$");
    let fullWord: string = fullDocument.substring(wordPosition, positionOffset);
    let prefixRegex: RegExp = new RegExp(`(?<=${prefix})${fullWord}`, "i");

    if (prefixRegex.exec(fullDocument) != null) {
        prefixes = true;
    }

    return prefixes;
}