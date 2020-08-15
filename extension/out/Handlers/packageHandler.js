"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePackageClasses = void 0;
const vscode = __importStar(require("vscode"));
const built_in_base_4GLPackage_json_1 = __importDefault(require("../Resources/built-in_base.4GLPackage.json"));
const built_in_dataTypes_4GLPackage_json_1 = __importDefault(require("../Resources/built-in_dataTypes.4GLPackage.json"));
const built_in_ui_4GLPackage_json_1 = __importDefault(require("../Resources/built-in_ui.4GLPackage.json"));
const external_com_4GLPackage_json_1 = __importDefault(require("../Resources/external_com.4GLPackage.json"));
const external_os_4GLPackage_json_1 = __importDefault(require("../Resources/external_os.4GLPackage.json"));
const external_security_4GLPackage_json_1 = __importDefault(require("../Resources/external_security.4GLPackage.json"));
const external_util_4GLPackage_json_1 = __importDefault(require("../Resources/external_util.4GLPackage.json"));
const external_xml_4GLPackage_json_1 = __importDefault(require("../Resources/external_xml.4GLPackage.json"));
function parsePackageClasses(importList) {
    let importPackages = [];
    importList.forEach(importItem => {
        if (importItem.type == "fgl" || importItem.name == "java") {
            return;
        }
        let importPackage = whatPackage(importItem.name);
        if (importPackage == null) {
            return;
        }
        try {
            importPackages.push(importPackage);
        }
        catch (error) {
            console.log(error);
        }
    });
    return importPackages;
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
function whatPackage(packageName) {
    let importPackage;
    switch (packageName) {
        case "base":
            importPackage = built_in_base_4GLPackage_json_1.default;
            break;
        case "dataTypes":
            importPackage = built_in_dataTypes_4GLPackage_json_1.default;
            break;
        case "ui":
            importPackage = built_in_ui_4GLPackage_json_1.default;
            break;
        case "com":
            importPackage = external_com_4GLPackage_json_1.default;
            break;
        case "os":
            importPackage = external_os_4GLPackage_json_1.default;
            break;
        case "security":
            importPackage = external_security_4GLPackage_json_1.default;
            break;
        case "util":
            importPackage = external_util_4GLPackage_json_1.default;
            break;
        case "xml":
            importPackage = external_xml_4GLPackage_json_1.default;
            break;
        default:
            break;
    }
    return importPackage;
}
//# sourceMappingURL=packageHandler.js.map