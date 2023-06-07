import { LitElement } from 'lit';
export declare class WordViewer extends LitElement {
    static styles: import("lit").CSSResult;
    private idx;
    private playDirection;
    words: string;
    private intervalTimer?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    tickToNextWord: () => void;
    switchPlayDirection: () => void;
}
//# sourceMappingURL=word-viewer.d.ts.map