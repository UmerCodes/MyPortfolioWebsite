import { Directive, ElementRef, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';

/**
 * Writes reading progress straight to the host element outside Angular's
 * change detection cycle. Uses a passive scroll listener and rAF.
 */
@Directive({
  selector: '[appScrollProgress]'
})
export class ScrollProgressDirective implements OnInit, OnDestroy {
  private frame = 0;
  private listening = false;

  private readonly handleScroll = (): void => {
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => this.update());
  };

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    private readonly ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.handleScroll, { passive: true });
      window.addEventListener('resize', this.handleScroll, { passive: true });
      this.listening = true;
      this.update();
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frame);
    if (this.listening) {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleScroll);
    }
  }

  private update(): void {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;
    this.renderer.setStyle(this.elementRef.nativeElement, 'transform', `scaleX(${progress})`);
  }
}
