"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __importStar(require("vscode"));
const importHandler_1 = require("./importHandler");
const packageHandler_1 = require("./packageHandler");
class GoCompletionProvider {
    provideCompletionItems(document, position) {
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
            // Append built-in classes
            importList.push("dataTypes", "base", "ui");
            resolve(completions.concat(packageHandler_1.parsePackageClasses(importList, document, position)));
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