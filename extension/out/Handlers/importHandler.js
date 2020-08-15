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
exports.importCompletion = exports.getImportList = void 0;
const vscode = __importStar(require("vscode"));
function getImportList(document) {
    let importList = [];
    let commentBlock = false;
    let endImports = new RegExp("^\\s*(public|private|define|type|constant|function|main|report|options|&define|&include)\\b", "i");
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
            importList.push({ type: words[0], name: words[1] });
        }
        else {
            importList.push({ name: words[0] });
        }
    });
    return importList;
}
exports.getImportList = getImportList;
function importCompletion(document, position, imports) {
    let completions = [];
    let fullDoc = document.getText(new vscode.Range(new vscode.Position(0, 0), position));
    let positionOffset = document.offsetAt(position);
    let tokenized = [];
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
exports.importCompletion = importCompletion;
//# sourceMappingURL=importHandler.js.map