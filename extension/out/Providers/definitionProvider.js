"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const vscode_uri_1 = require("vscode-uri");
class GoDefinitionProvider {
    provideDefinition(document) {
        return new vscode_1.Location(vscode_uri_1.URI.file(document.fileName), new vscode_1.Position(15, 2));
    }
}
exports.default = GoDefinitionProvider;
//# sourceMappingURL=definitionProvider.js.map