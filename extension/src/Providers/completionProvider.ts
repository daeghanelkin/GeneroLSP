import * as vscode from "vscode";
//import keywords from "../Resources/4GLKeywords.json";
import { getImportList } from "./importHandler";
import { parsePackageClasses } from "./packageHandler";

export default class GoCompletionProvider implements vscode.CompletionItemProvider {
    public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): Thenable<vscode.CompletionItem[]> {
        return new Promise((resolve, reject) => {
            let completions: vscode.CompletionItem[] = [];
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

            let importList: string[] = getImportList(document);
            // Append built-in classes
            importList.push("dataTypes", "base", "ui");

            resolve(completions.concat(parsePackageClasses(importList, document, position)));
        });
    }

}

function determineType(keywordType:string) {
    let kind: vscode.CompletionItemKind;

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
