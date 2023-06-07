import { css,html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('word-viewer')
export class WordViewer extends LitElement {
    static override styles = css`
        :host {
            display: flex;
            justify-content: center;
            color: violet;
            font-size: 40px;
            cursor: pointer;
        }
        pre {
            padding: 0.2em;
            margin-top: 10em;
        }
        .backwards {
            color: red;
        }
    `;
    @state() private idx = 0;
    @state() private playDirection = 1;

    @property() words: string = '';

    private intervalTimer?: number;

    override connectedCallback() {
        super.connectedCallback();
        this.intervalTimer = window.setInterval(this.tickToNextWord, 1000);
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        clearInterval(this.intervalTimer);
        this.intervalTimer = undefined;
    }
    override render() {
        const splitWords = this.words.split('.');
        return html`<pre 
            @click=${this.switchPlayDirection}
            class="${classMap({ backwards: this.playDirection === -1 })}"
            >${splitWords[((this.idx % splitWords.length) + splitWords.length) % splitWords.length]}</pre>`;
    }

    tickToNextWord = () => { this.idx += this.playDirection; };

    switchPlayDirection = () => {
        this.playDirection *= -1;
    }
}