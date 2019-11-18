import { languages} from "vscode";
import GoDefinitionProvider from "./Providers/definitionProvider";
import GoHoverProvider from "./Providers/hoverProvider";

/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

export function activate() {
    console.log("Extension: Genero Extension Started");
    registerLanguageFeatures();
}

function registerLanguageFeatures() {
    languages.registerDefinitionProvider("genero 4gl", new GoDefinitionProvider());
    languages.registerHoverProvider({scheme: 'file', language: 'genero 4gl'}, new GoHoverProvider());
}