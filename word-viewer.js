var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, state } from 'lit/decorators.js';
let WordViewer = class WordViewer extends LitElement {
    constructor() {
        super(...arguments);
        this.idx = 0;
        this.playDirection = 1;
        this.words = '';
        this.tickToNextWord = () => { this.idx += this.playDirection; };
        this.switchPlayDirection = () => {
            this.playDirection *= -1;
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this.intervalTimer = window.setInterval(this.tickToNextWord, 1000);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        clearInterval(this.intervalTimer);
        this.intervalTimer = undefined;
    }
    render() {
        const splitWords = this.words.split('.');
        return html `<pre 
            @click=${this.switchPlayDirection}
            class="${classMap({ backwards: this.playDirection === -1 })}"
            >${splitWords[((this.idx % splitWords.length) + splitWords.length) % splitWords.length]}</pre>`;
    }
};
WordViewer.styles = css `
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
__decorate([
    state()
], WordViewer.prototype, "idx", void 0);
__decorate([
    state()
], WordViewer.prototype, "playDirection", void 0);
__decorate([
    property()
], WordViewer.prototype, "words", void 0);
WordViewer = __decorate([
    customElement('word-viewer')
], WordViewer);
export { WordViewer };
//# sourceMappingURL=word-viewer.js.map