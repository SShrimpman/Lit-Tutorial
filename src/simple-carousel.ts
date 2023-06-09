import { LitElement, html, css } from "lit";
import { customElement, property, queryAssignedElements, state } from "lit/decorators.js";
import {
    AnimationTuple,
    SLIDE_LEFT_IN,
    SLIDE_LEFT_OUT,
    SLIDE_RIGHT_IN,
    SLIDE_RIGHT_OUT,
    BOOTSTRAP_CHEVRON_LEFT,
    BOOTSTRAP_CHEVRON_RIGHT,
} from "./constants.js";
import { styleMap } from "lit/directives/style-map.js";
import './slide-button'

@customElement('simple-carousel')
export class SimpleCarousel extends LitElement {
    static override styles = css`
        ::slotted(.slide-hidden) {
            display: none;
        }
        /** So the elements all overlap */
        ::slotted(*) {
            position: absolute;
            padding: 1em;
        }
        :host {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        #container {
            border-radius: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1;
            margin: 0 18px;
            padding: 1em;
            overflow: hidden;
            position: relative;
            box-shadow: var( --carousel-box-shadow,
                    #293198 0.3em 0.3em 0.4em,
                    #ceffff -0.1em -0.1em 0.3em
            );
        }
    `;
    @state() private containerHeight = 0;
    @property({ type: Number }) slideIndex = 0

    @queryAssignedElements()
    private readonly slideElements!: HTMLElement[];

    override render() {
        const containerStyles = {
            height: `${this.containerHeight}px`
        };
        return html`
            <slide-button
              exportparts="internal-btn : buttons"
              part="buttons left-button"
              @click=${this.navigateToPrevSlide}>
                ${BOOTSTRAP_CHEVRON_LEFT}
            </slide-button>
            <div part="container" id="container"
              style="${styleMap(containerStyles)}">
                <slot></slot>
            </div>
            <slide-button
              exportparts="internal-btn : buttons"
              part="buttons right-button"
              @click=${this.navigateToNextSlide}>
                ${BOOTSTRAP_CHEVRON_RIGHT}
            </slide-button>
        `;
    }

    override firstUpdated() {
        this.containerHeight = getMaxElHeight(this.slideElements);
        this.initializeSlide();
    }
    private initializeSlide() {
        for (let i = 0; i < this.slideElements.length; i++) {
            if (i === this.slideIndex) {
                showSlide(this.slideElements[i]);
            } else {
                hideSlide(this.slideElements[i]);
            }
        }
    }
    /** Changes current slide index by offset and wraps index */
    private changeSlide(offset: number) {
        const slideCount = this.slideElements.length;
        this.slideIndex = (slideCount + ((this.slideIndex + offset) % slideCount)) % slideCount;
    }
    navigateToNextSlide = () => {
        this.navigateWithAnimation(1, SLIDE_LEFT_OUT, SLIDE_RIGHT_IN);
    }
    navigateToPrevSlide = () => {
        this.navigateWithAnimation(-1, SLIDE_RIGHT_OUT, SLIDE_LEFT_IN);
    }
    private async navigateWithAnimation(
        nextSlideOffset: number,
        leavingAnimation: AnimationTuple,
        enteringAnimation: AnimationTuple
    ) {
        const elLeaving = this.slideElements[this.slideIndex];
        const leavingAnim = elLeaving.animate(
            leavingAnimation[0], 
            leavingAnimation[1]
        );
        // Change slide
        this.changeSlide(nextSlideOffset);
        const newSlideEl = this.slideElements[this.slideIndex];
        // Show the new slide
        showSlide(newSlideEl);
        // Teleport it out of view and animate it in
        const enteringAnim = newSlideEl.animate(
            enteringAnimation[0],
            enteringAnimation[1]
        );
        // Wait for animations
        await Promise.all([leavingAnim.finished, enteringAnim.finished]);
        // Hide the element that left
        hideSlide(elLeaving);
    }
}

function hideSlide(el: HTMLElement) {
    el.classList.add('slide-hidden');
}

function showSlide(el: HTMLElement) {
    el.classList.remove('slide-hidden');
}

function getMaxElHeight(els: HTMLElement[]): number {
    return Math.max(0,
        ...els.map(el => el.getBoundingClientRect().height));
}

declare global {
    interface HTMLElementTagNameMap {
        "simple-carousel": SimpleCarousel;
    }
}

