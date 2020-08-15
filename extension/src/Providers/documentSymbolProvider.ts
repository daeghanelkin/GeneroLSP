import * as vscode from "vscode";

interface LocalizeDocumentSymbol {
    scope: string;
    type: string;
    name: string;
    kind: vscode.SymbolKind;
    range: vscode.Range;
    selectionRange: vscode.Range;
}

export default class GoDocumentSymbolProvider implements vscode.DocumentSymbolProvider {

    // Only gets functions
    public provideDocumentSymbols(document: vscode.TextDocument): Thenable<vscode.DocumentSymbol[]> {
        return new Promise((resolve, reject) => {
            let symbols: vscode.DocumentSymbol[] = [];
            let functions: LocalizeDocumentSymbol[] = [];

            for (let i = 0; i < document.lineCount; i++) {
                const currentLine: vscode.TextLine = document.lineAt(i);

                let lineMatch = this.isFunctionDeclaration(currentLine.text) ||
                    this.isReportDeclaration(currentLine.text) ||
                    this.isMethodDeclaration(currentLine.text);

                if (lineMatch != null) {
                    // Default in a scope if none is found
                    var scope = lineMatch.scope;
                    var type = lineMatch.type;
                    var kind = lineMatch.kind
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

    private isFunctionDeclaration(currentLine: string) {
        let regex = new RegExp("^\\s*(?:(public|private)\\s+)?function\\s+(\\w+)\\s*");
        let match = regex.exec(currentLine);
        if (match != null) {
            return {
                scope: match[1] || "public",
                type: "function",
                name: match[2],
                kind: vscode.SymbolKind.Function
            }
        }
    }

    private isReportDeclaration(currentLine: string) {
        let regex = new RegExp("^\\s*(?:(public|private)\\s+)?report\\s+(\\w+)\\s*");
        let match = regex.exec(currentLine);
        if (match != null) {
            return {
                scope: match[1] || "public",
                type: "report",
                name: match[2],
                kind: vscode.SymbolKind.Function
            }
        }
    }

    private isMethodDeclaration(currentLine: string) {
        let regex = new RegExp("^\\s*(?:(public|private)\\s+)?function\\s*\\(\\w+\\s+\\w+\\)\\s+(\\w+)\\s*");
        let match = regex.exec(currentLine);
        if (match != null) {
            return {
                scope: match[1] || "public",
                type: "function",
                name: match[2],
                kind: vscode.SymbolKind.Method
            }
        }
    }
}