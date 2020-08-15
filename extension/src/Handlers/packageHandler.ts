import * as vscode from "vscode";
import { ImportType } from "./importHandler";
import base from "../Resources/built-in_base.4GLPackage.json";
import dataTypes from "../Resources/built-in_dataTypes.4GLPackage.json";
import ui from "../Resources/built-in_ui.4GLPackage.json";
import com from "../Resources/external_com.4GLPackage.json";
import os from "../Resources/external_os.4GLPackage.json";
import security from "../Resources/external_security.4GLPackage.json";
import util from "../Resources/external_util.4GLPackage.json";
import xml from "../Resources/external_xml.4GLPackage.json";

export interface Package extends Info {
    type: string;
    classes: PackageClass[]
}

interface PackageClass extends Info {
    objectMethods?: Method[];
    classMethods?: Method[];
}

interface Method extends Info {
    name: string;
    parameters?: Parameter[];
    returns?: Return[];
}

interface Info {
    name: string;
    description?: string;
    documentation?: string;
    minimumLanguageVersion?: string;
    maximumLanguageVersion?: string;
}

interface Parameter {
    name: string;
    type: string;
    description?: string;
    recordMembers?: Record[];
}

interface Return {
    type: string;
    description?: string;
}

interface Record {
    name: string;
    type: string;
    description?: string;
}

export function parsePackageClasses(importList: ImportType[]) {
    let importPackages: Package[] = [];
    importList.forEach(importItem => {
        if (importItem.type == "fgl" || importItem.name == "java") {
            return;
        }
        let importPackage: Package = whatPackage(importItem.name)
        if (importPackage == null) {
            return;
        }
        try {
            importPackages.push(importPackage);
        } catch (error) {
           console.log(error) 
        }
    });
    return importPackages;
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

function whatPackage(packageName: string) {
    let importPackage: Package
    switch (packageName) {
        case "base":
            importPackage = base;
            break;
        case "dataTypes":
            importPackage = dataTypes;
            break;
        case "ui":
            importPackage = ui;
            break;
        case "com":
            importPackage = com;
            break;
        case "os":
            importPackage = os;
            break;
        case "security":
            importPackage = security;
            break;
        case "util":
            importPackage = util;
            break;
        case "xml":
            importPackage = xml;
            break;
        default:
            break;
    }
    return importPackage;
}