"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
//import GoDefinitionProvider from "./Providers/definitionProvider";
//import GoHoverProvider from "./Providers/hoverProvider";
const documentSymbolProvider_1 = __importDefault(require("./Providers/documentSymbolProvider"));
//import GoWorkspaceSymbolProvider from "./Providers/workspaceSymbolProvider";
const completionProvider_1 = __importDefault(require("./Providers/completionProvider"));
function activate() {
    console.log("Extension: Genero Extension Started");
    registerLanguageFeatures();
}
exports.activate = activate;
function registerLanguageFeatures() {
    //languages.registerDefinitionProvider({scheme: 'file', language: 'genero 4gl'}, new GoDefinitionProvider());
    //languages.registerHoverProvider({scheme: 'file', language: 'genero 4gl'}, new GoHoverProvider());
    vscode_1.languages.registerDocumentSymbolProvider({ scheme: 'file', language: 'genero 4gl' }, new documentSymbolProvider_1.default());
    //languages.registerDocumentSymbolProvider({scheme: 'file', language: 'genero 4gl'}, new GoWorkspaceSymbolProvider());
    vscode_1.languages.registerCompletionItemProvider({ scheme: 'file', language: 'genero 4gl' }, new completionProvider_1.default());
}
//# sourceMappingURL=extension.js.map