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
class GoDocumentSymbolProvider {
    // Only gets functions
    provideDocumentSymbols(document) {
        return new Promise((resolve, reject) => {
            let symbols = [];
            let functions = [];
            for (let i = 0; i < document.lineCount; i++) {
                const currentLine = document.lineAt(i);
                let lineMatch = this.isFunctionDeclaration(currentLine.text) ||
                    this.isReportDeclaration(currentLine.text) ||
                    this.isMethodDeclaration(currentLine.text);
                if (lineMatch != null) {
                    // Default in a scope if none is found
                    var scope = lineMatch.scope;
                    var type = lineMatch.type;
                    var kind = lineMatch.kind;
                    var name = lineMatch.name;
                    var startLine = currentLine.lineNumber;
                    var offset = currentLine.text.indexOf(name);
                    var selectRange = new vscode.Range(startLine, offset, startLine, offset + name.length);
                    continue;
                }
                let regex = new RegExp("^\\s*end\\s+" + type + "\\b", "i");
                let match = regex.exec(currentLine.text);
                if (match != null) {
                    let endLine = currentLine.lineNumber;
                    symbols.push(new vscode.DocumentSymbol(name, '', kind, new vscode.Range(startLine, 0, endLine, currentLine.text.length), selectRange));
                    continue;
                }
            }
            resolve(symbols);
        });
    }
    isFunctionDeclaration(currentLine) {
        let regex = new RegExp("^\\s*(?:(public|private)\\s+)?function\\s+(\\w+)\\s*");
        let match = regex.exec(currentLine);
        if (match != null) {
            return {
                scope: match[1] || "public",
                type: "function",
                name: match[2],
                kind: vscode.SymbolKind.Function
            };
        }
    }
    isReportDeclaration(currentLine) {
        let regex = new RegExp("^\\s*(?:(public|private)\\s+)?report\\s+(\\w+)\\s*");
        let match = regex.exec(currentLine);
        if (match != null) {
            return {
                scope: match[1] || "public",
                type: "report",
                name: match[2],
                kind: vscode.SymbolKind.Function
            };
        }
    }
    isMethodDeclaration(currentLine) {
        let regex = new RegExp("^\\s*(?:(public|private)\\s+)?function\\s*\\(\\w+\\s+\\w+\\)\\s+(\\w+)\\s*");
        let match = regex.exec(currentLine);
        if (match != null) {
            return {
                scope: match[1] || "public",
                type: "function",
                name: match[2],
                kind: vscode.SymbolKind.Method
            };
        }
    }
}
exports.default = GoDocumentSymbolProvider;
//# sourceMappingURL=documentSymbolProvider.js.map