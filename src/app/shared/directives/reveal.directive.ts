import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2
} from '@angular/core';

/**
 * Adds a subtle entrance animation when an element enters the viewport.
 * Falls back to immediately visible when motion is reduced or the
 * IntersectionObserver API is unavailable.
 */
@Directive({
  selector: '[appReveal]'
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  @Input() revealDelay = 0;

  private observer?: IntersectionObserver;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement;
    this.renderer.addClass(element, 'reveal');

    if (this.revealDelay > 0) {
      element.style.setProperty('--reveal-delay', `${this.revealDelay}ms`);
    }

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      this.renderer.addClass(element, 'is-revealed');
      return;
    }

    this.observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }
          this.renderer.addClass(element, 'is-revealed');
          this.observer?.unobserve(entry.target);
          this.observer?.disconnect();
          this.observer = undefined;
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
