import { Directive, ElementRef, Input, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';

/**
 * A restrained pointer-driven 3D tilt. Only activates for fine pointers
 * and is completely disabled when reduced motion is requested.
 */
@Directive({
  selector: '[appTilt]'
})
export class TiltDirective implements OnInit, OnDestroy {
  @Input() tiltMax = 5;
  @Input() tiltScale = 1.01;

  private frame = 0;
  private reduceMotion = false;
  private unlistenMove?: () => void;
  private unlistenLeave?: () => void;

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

    const element = this.elementRef.nativeElement;
    this.ngZone.runOutsideAngular(() => {
      this.unlistenMove = this.renderer.listen(element, 'pointermove', this.onPointerMove);
      this.unlistenLeave = this.renderer.listen(element, 'pointerleave', this.onPointerLeave);
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frame);
    this.unlistenMove?.();
    this.unlistenLeave?.();
  }

  private readonly onPointerMove = (event: PointerEvent): void => {
    if (event.pointerType !== 'mouse') {
      return;
    }

    const element = this.elementRef.nativeElement;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      const rotateX = (-y * this.tiltMax).toFixed(2);
      const rotateY = (x * this.tiltMax).toFixed(2);
      this.renderer.setStyle(
        element,
        'transform',
        `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${this.tiltScale})`
      );
      element.style.setProperty('--tilt-x', `${(x * 100).toFixed(1)}%`);
      element.style.setProperty('--tilt-y', `${(y * 100).toFixed(1)}%`);
    });
  };

  private readonly onPointerLeave = (): void => {
    cancelAnimationFrame(this.frame);
    this.reset();
  };

  private reset(): void {
    const element = this.elementRef.nativeElement;
    this.renderer.removeStyle(element, 'transform');
    element.style.removeProperty('--tilt-x');
    element.style.removeProperty('--tilt-y');
  }
}
