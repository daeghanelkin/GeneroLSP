import * as vscode from "vscode";

interface LocalizeDocumentSymbol {
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

            // Loop through lines of file
            for (let i = 0; i < document.lineCount; i++) {
                const currentLine = document.lineAt(i);
                let regex = new RegExp("^\\s*(?:(?:public|private)\\s+)?(?:function)\\s*(\\w+)\\s*\\(", "i");
                let match = regex.exec(currentLine.text);
                // Check if current line is a function or report declaration
                if (match !== null) {
                    let name = match[1];
                    let type = vscode.SymbolKind.Function;
                    let line = currentLine.lineNumber;
                    let offset = currentLine.text.indexOf(name);
                    let funcRange = new vscode.Range(line, 0, line, 0);
                    let selectRange = new vscode.Range(line, offset, line, offset+name.length)
                    functions.push({name: name, kind: type, range: funcRange, selectionRange: selectRange});
                }
            }

            // Find "end function" corresponding to function declaration
            functions.forEach((symbol) => {
                for (let i = symbol.range.start.line; i < document.lineCount; i++) {
                    const currentLine = document.lineAt(i);

                    // Get close of function
                    let r = "^\\s*end\\s+function\\b"
                    let regex = new RegExp(r, "i");
                    let match = regex.exec(currentLine.text);
                    if (match !== null) {
                        symbol.range = new vscode.Range(symbol.range.start.line, 0, currentLine.lineNumber, currentLine.text.length); 
                        break;
                    }
                }
            });

            // Push each function symbol into the document symbol stack
            functions.forEach((symbol) => {
                symbols.push(new vscode.DocumentSymbol(symbol.name, '', symbol.kind, symbol.range, symbol.selectionRange));
            });

            resolve(symbols);
        });
    }
}