import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('slide-button')
class SlideButton extends LitElement {
    static override styles = css`
        #btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2em;
            height: 2em;
            cursor: pointer;
            border-radius: 1em;
            box-shadow: var( --carousel-box-shadow,
                    #293198 0.2em 0.2em 0.4em,
                    #ceffff -0.1em -0.1em 0.2em
            );
        }

        #btn:active:hover, #btn:hover:active {
            box-shadow: var( --carousel-active-btn-box-shadow,
                    inset #293198 0.2em 0.2em 0.4em,
                    inset #ceffff -0.1em -0.1em 0.2em
            );
            background-color: var( --carousel-active-btn-background-color );
            color: var( --carousel-active-btn-color );
        }

        ::slotted(svg) {
            width: 1em;
            height: 1em;
        }
    `;
    override render() {
        return html`
            <div
                part="internal-btn"
                id="btn"
                tabindex="0"
                role="button"
                aria-pressed="false">
              <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "simple-button": SlideButton;
    }
}