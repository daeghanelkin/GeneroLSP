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
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __importStar(require("vscode"));
//import keywords from "../Resources/4GLKeywords.json";
const importHandler_1 = require("../Handlers/importHandler");
const packageHandler_1 = require("../Handlers/packageHandler");
class GoCompletionProvider {
    provideCompletionItems(document, position, token, context) {
        return new Promise((resolve, reject) => {
            let completions = [];
            /*
            keywords.forEach(keyword => {
                let completer: vscode.CompletionItem = new vscode.CompletionItem(keyword.name.toLowerCase(), determineType(keyword.type));
                completer.filterText = keyword.name.toLowerCase();
                if (keyword.description) {
                    completer.documentation = new vscode.MarkdownString(keyword.description)
                    if (keyword.documentation) {
                        completer.documentation.appendText("\n\n");
                        completer.documentation.appendMarkdown("[Documentation](" + keyword.documentation + ")")
                    }
                }
                completions.push(completer);
            });
            */
            let importList = importHandler_1.getImportList(document);
            importList.push({ name: "dataTypes" }, { name: "base" }, { name: "ui" });
            let importPackages = packageHandler_1.parsePackageClasses(importList);
            // Append built-in classes
            completions = importHandler_1.importCompletion(document, position, importPackages);
            resolve(completions);
        });
    }
}
exports.default = GoCompletionProvider;
function determineType(keywordType) {
    let kind;
    switch (keywordType) {
        case "keyword":
            kind = vscode.CompletionItemKind.Keyword;
            break;
        case "color":
            kind = vscode.CompletionItemKind.Color;
            break;
        case "constant":
            kind = vscode.CompletionItemKind.Constant;
            break;
        case "variable":
            kind = vscode.CompletionItemKind.Variable;
            break;
        case "operator":
            kind = vscode.CompletionItemKind.Operator;
            break;
        case "method":
            kind = vscode.CompletionItemKind.Method;
            break;
        default:
            kind = vscode.CompletionItemKind.Keyword;
            break;
    }
    return kind;
}
//# sourceMappingURL=completionProvider.js.map