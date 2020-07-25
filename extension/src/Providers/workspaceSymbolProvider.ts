import * as vscode from "vscode";

export default class GoWorkspaceSymbolProvider implements vscode.WorkspaceSymbolProvider {
    public provideWorkspaceSymbols(query: string): Thenable<vscode.SymbolInformation[]> {
       return new Promise((resolve, reject) => {

       });
    } 
}