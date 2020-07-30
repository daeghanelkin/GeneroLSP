"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getImportList(document) {
    let importList = [];
    let commentBlock = false;
    let endImports = new RegExp("^(public|private|define|type|constant|function|main|report|options)\\b", "i");
    let commentPosition = -1;
    let importSection = "";
    for (let i = 0; i < document.lineCount; i++) {
        let line = document.lineAt(i).text.trim();
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
        let match = endImports.exec(line);
        if (match != null) {
            break;
        }
        // At this point everything should be trimmed so we can just create a
        // big string
        importSection = `${importSection} ${line}`;
    }
    let imports = importSection.trim().split(new RegExp("\\bimport\\b", "i"));
    imports.forEach(element => {
        element = element.trim();
        // Skip blank elements
        if (!element.length) {
            return;
        }
        let words = element.split(" ");
        if (words[0].toLowerCase() == "fgl" || words[0].toLowerCase() == "java") {
            importList.push(words[1]);
        }
        else {
            importList.push(words[0]);
        }
    });
    return importList;
}
exports.getImportList = getImportList;
//# sourceMappingURL=importHandler.js.map