import { LitElement } from "lit";
import './slide-button';
export declare class SimpleCarousel extends LitElement {
    static styles: import("lit").CSSResult;
    private containerHeight;
    slideIndex: number;
    private readonly slideElements;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    private initializeSlide;
    /** Changes current slide index by offset and wraps index */
    private changeSlide;
    navigateToNextSlide: () => void;
    navigateToPrevSlide: () => void;
    private navigateWithAnimation;
}
declare global {
    interface HTMLElementTagNameMap {
        "simple-carousel": SimpleCarousel;
    }
}
//# sourceMappingURL=simple-carousel.d.ts.map