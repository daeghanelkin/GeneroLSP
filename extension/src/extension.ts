import { languages} from "vscode";
//import GoDefinitionProvider from "./Providers/definitionProvider";
//import GoHoverProvider from "./Providers/hoverProvider";
import GoDocumentSymbolProvider from "./Providers/documentSymbolProvider";
//import GoWorkspaceSymbolProvider from "./Providers/workspaceSymbolProvider";
import GoCompletionProvider from "./Providers/completionProvider";

export function activate() {
    console.log("Extension: Genero Extension Started");
    registerLanguageFeatures();
}

function registerLanguageFeatures() {
    //languages.registerDefinitionProvider({scheme: 'file', language: 'genero 4gl'}, new GoDefinitionProvider());
    //languages.registerHoverProvider({scheme: 'file', language: 'genero 4gl'}, new GoHoverProvider());
    languages.registerDocumentSymbolProvider({scheme: 'file', language: 'genero 4gl'}, new GoDocumentSymbolProvider());
    //languages.registerDocumentSymbolProvider({scheme: 'file', language: 'genero 4gl'}, new GoWorkspaceSymbolProvider());
    languages.registerCompletionItemProvider({scheme: 'file', language: 'genero 4gl'}, new GoCompletionProvider(), '.');
}