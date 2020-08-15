import * as vscode from "vscode";

export interface ImportType {
    type?: string;
    name: string;
}

export function getImportList(document: vscode.TextDocument) {
    let importList: ImportType[] = [];
    let commentBlock: boolean = false;
    let endImports: RegExp = new RegExp("^\\s*(public|private|define|type|constant|function|main|report|options|&define|&include)\\b", "i");
    let commentPosition: number = -1;
    let importSection: string = "";

    for (let i = 0; i < document.lineCount; i++) {
        let line: string = document.lineAt(i).text.trim();

        // Skip blank lines
        if (!line.length) {
            continue;
        }

        // Check for comment block ending
        if (commentBlock) {
            commentPosition = line.search("}");
            if (commentPosition >= 0) {
                commentBlock = false;
                line = line.substring(commentPosition + 1).trim();
                if (!line.length) {
                    continue;
                }
            }
        }

        // Trim off any line comments
        commentPosition = line.search("(--|#)");
        if (commentPosition >= 0) {
            line = line.substring(0, commentPosition).trim();
            if (!line.length) {
                continue;
            }
        }

        // Check for comment block start
        commentPosition = line.search("{");
        if (commentPosition >= 0) {
            commentBlock = true;
            line = line.substring(0, commentPosition).trim();
            if (!line.length) {
                continue;
            }
        }

        // Check for end of import range
        let match: RegExpExecArray = endImports.exec(line);
        if (match != null) {
            break;
        }

        // At this point everything should be trimmed so we can just create a
        // big string
        importSection = `${importSection} ${line}`;
    }

    let imports: Array<string> = importSection.trim().split(new RegExp("\\bimport\\b", "i"));

    imports.forEach(element => {
        element = element.trim();
        // Skip blank elements
        if (!element.length) {
            return;
        }
        let words: Array<string> = element.split(" ");
        if (words[0].toLowerCase() == "fgl" || words[0].toLowerCase() == "java") {
            importList.push({type: words[0], name: words[1]});
        }
        else {
            importList.push({name: words[0]});
        }
    });

    return importList;
}

export function importCompletion(document: vscode.TextDocument, position: vscode.Position, imports: ImportType[]) {
    let completions: vscode.CompletionItem[] = [];
    let fullDoc: string = document.getText(new vscode.Range(new vscode.Position(0,0), position));
    let positionOffset: number = document.offsetAt(position);
    let tokenized: string[] = [];
    // Ignore blank values
    fullDoc.split(" ").forEach(token => {
        if (token.length == 0) {
            return;
        }
        tokenized.push(token);
    });
    tokenized.reverse();
    tokenized.forEach(token => {
        if (token[0] != '.') {
            let desiredWord = token;
        }

    });
    return completions;
}