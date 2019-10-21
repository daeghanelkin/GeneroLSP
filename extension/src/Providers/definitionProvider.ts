import {
    DefinitionProvider,
    Location,
    ProviderResult,
    TextDocument,
    Position, 
    CancellationToken
} from 'vscode';

export default class GoDefinitionProvider implements DefinitionProvider {
    public provideDefinition(
        document: TextDocument,
        position: Position,
        token: CancellationToken): Thenable<Location> {
        return this.getDefinition(document, position, token);
    }

    public getDefinition(document: TextDocument, position: Position, token: CancellationToken): Promise<Location> {

        if (token) {
            if (token.isCancellationRequested) {
            }
        }

        let wordRange = document.getWordRangeAtPosition(position);
        
        return
    }
}