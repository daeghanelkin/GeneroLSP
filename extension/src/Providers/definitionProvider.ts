import {
    DefinitionProvider,
    Location,
    TextDocument,
    Position
} from 'vscode';

import {
    URI
} from 'vscode-uri';

export default class GoDefinitionProvider implements DefinitionProvider {
    public provideDefinition(
        document: TextDocument): Location {
        return new Location(
            URI.file(document.fileName),
            new Position(15, 2)
        );
    }
}