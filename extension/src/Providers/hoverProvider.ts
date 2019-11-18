import { HoverProvider, Hover } from "vscode";

export default class GoHoverPorvider implements HoverProvider {
    public provideHover(): Hover {
            return new Hover("Yo Yo Yo");
        }
}