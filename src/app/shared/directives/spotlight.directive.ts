import { Directive, ElementRef, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';

/**
 * Tracks the pointer position on a host element as CSS custom properties.
 * Components use --spot-x / --spot-y to render a soft radial highlight.
 */
@Directive({
  selector: '[appSpotlight]'
})
export class SpotlightDirective implements OnInit, OnDestroy {
  private frame = 0;
  private reduceMotion = false;
  private unlisten?: () => void;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    private readonly ngZone: NgZone
  ) {
    this.reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  }

  ngOnInit(): void {
    if (this.reduceMotion) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.unlisten = this.renderer.listen(
        this.elementRef.nativeElement,
        'pointermove',
        this.onPointerMove
      );
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frame);
    this.unlisten?.();
  }

  private readonly onPointerMove = (event: PointerEvent): void => {
    if (event.pointerType !== 'mouse') {
      return;
    }

    const element = this.elementRef.nativeElement;
    const rect = element.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      element.style.setProperty('--spot-x', `${x.toFixed(1)}%`);
      element.style.setProperty('--spot-y', `${y.toFixed(1)}%`);
    });
  };
}
