import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { ClipboardService } from './core/clipboard.service';
import { NAV_ITEMS } from './content/portfolio-content';
import type { IconName } from './shared/components/icon/icon.component';

interface PaletteEntry {
  id: string;
  label: string;
  hint: string;
  icon: IconName;
  group: 'Sections' | 'Actions';
  action: () => void;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly title = 'Muhammad Umer — Software Developer';
  readonly navItems = NAV_ITEMS;
  readonly headerNavItems = NAV_ITEMS.filter(item => item.id !== 'contact');
  readonly email = 'muhammadumersince1996@gmail.com';
  readonly github = 'https://github.com/UmerCodes';
  readonly currentYear = new Date().getFullYear();

  menuOpen = false;
  paletteOpen = false;
  paletteQuery = '';
  paletteIndex = 0;
  scrolled = false;
  activeSection = '';
  shortcutLabel = 'Ctrl K';
  localTime = '';
  toast = '';

  @ViewChild('paletteInput') private paletteInput?: ElementRef<HTMLInputElement>;
  @ViewChild('paletteTrigger') private paletteTrigger?: ElementRef<HTMLButtonElement>;
  @ViewChild('menuToggle') private menuToggle?: ElementRef<HTMLButtonElement>;
  @ViewChild('mobileNav') private mobileNav?: ElementRef<HTMLElement>;

  private readonly paletteEntries: PaletteEntry[] = [
    ...NAV_ITEMS.map(item => ({
      id: `section-${item.id}`,
      label: item.label,
      hint: `Go to section ${item.index}`,
      icon: 'arrow-right' as IconName,
      group: 'Sections' as const,
      action: () => this.goToSection(item.id)
    })),
    {
      id: 'copy-email',
      label: 'Copy email address',
      hint: this.email,
      icon: 'copy',
      group: 'Actions',
      action: () => void this.copyEmail()
    },
    {
      id: 'github',
      label: 'Open GitHub profile',
      hint: 'github.com/UmerCodes',
      icon: 'github',
      group: 'Actions',
      action: () => window.open(this.github, '_blank', 'noopener,noreferrer')
    },
    {
      id: 'back-to-top',
      label: 'Back to top',
      hint: 'Return to the beginning',
      icon: 'arrow-up',
      group: 'Actions',
      action: () => this.goToSection('hero')
    }
  ];

  private scrollFrame = 0;
  private clockTimer?: number;
  private toastTimer?: number;
  private sectionOffsets: Array<{ id: string; top: number }> = [];
  private lastFocused: HTMLElement | null = null;
  private scrollLocked = false;
  private lockedScrollY = 0;

  constructor(
    private readonly clipboard: ClipboardService,
    private readonly ngZone: NgZone
  ) {}

  get filteredPaletteItems(): PaletteEntry[] {
    const query = this.paletteQuery.trim().toLowerCase();
    if (!query) {
      return this.paletteEntries;
    }
    return this.paletteEntries.filter(
      entry =>
        entry.label.toLowerCase().includes(query) ||
        entry.hint.toLowerCase().includes(query) ||
        entry.group.toLowerCase().includes(query)
    );
  }

  get activePaletteId(): string | null {
    const items = this.filteredPaletteItems;
    return items[this.paletteIndex]?.id ?? null;
  }

  ngOnInit(): void {
    this.shortcutLabel = navigator.userAgent.includes('Mac') ? '⌘ K' : 'Ctrl K';
    this.updateClock();

    this.ngZone.runOutsideAngular(() => {
      this.scrollFrame = requestAnimationFrame(() => this.handleScroll());
      window.addEventListener('scroll', this.onWindowScroll, { passive: true });
      window.addEventListener('resize', this.onWindowResize, { passive: true });
      this.clockTimer = window.setInterval(() => this.updateClock(), 30000);
    });
  }

  ngAfterViewInit(): void {
    this.updateSectionOffsets();
    this.ngZone.runOutsideAngular(() => this.handleScroll());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.scrollFrame);
    if (this.clockTimer) {
      window.clearInterval(this.clockTimer);
    }
    if (this.toastTimer) {
      window.clearTimeout(this.toastTimer);
    }
    window.removeEventListener('scroll', this.onWindowScroll);
    window.removeEventListener('resize', this.onWindowResize);
    if (this.scrollLocked) {
      this.resetBodyLockStyles();
      this.scrollLocked = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    const anchor = target?.closest('a');
    if (!anchor || anchor.classList.contains('skip-link')) {
      return;
    }

    const href = anchor.getAttribute('href');
    if (!href || !href.startsWith('#') || href === '#') {
      return;
    }

    const id = href.slice(1);
    if (!document.getElementById(id)) {
      return;
    }

    event.preventDefault();
    this.closeMenu();
    this.navigateTo(id);
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.togglePalette();
      return;
    }

    if (this.paletteOpen) {
      this.handlePaletteKeyboard(event);
      return;
    }

    if (this.menuOpen) {
      if (event.key === 'Escape') {
        event.preventDefault();
        this.closeMenu(true);
      }
      return;
    }

    if (event.key === 'Escape') {
      this.closeMenu();
    }
  }

  private readonly onWindowScroll = (): void => {
    cancelAnimationFrame(this.scrollFrame);
    this.scrollFrame = requestAnimationFrame(() => this.handleScroll());
  };

  private readonly onWindowResize = (): void => {
    this.updateSectionOffsets();
    if (window.innerWidth > 1024 && this.menuOpen) {
      this.ngZone.run(() => this.closeMenu());
    }
  };

  private handleScroll(): void {
    const scrollY = window.scrollY;
    const scrolled = scrollY > 20;
    let active = '';
    const marker = scrollY + 170;

    for (const section of this.sectionOffsets) {
      if (section.top <= marker) {
        active = section.id;
      }
    }

    if (scrolled !== this.scrolled || active !== this.activeSection) {
      this.ngZone.run(() => {
        this.scrolled = scrolled;
        this.activeSection = active;
      });
    }
  }

  private updateSectionOffsets(): void {
    const ids = ['hero', ...NAV_ITEMS.map(item => item.id)];
    this.sectionOffsets = ids
      .map(id => {
        const element = document.getElementById(id);
        return element
          ? { id, top: element.getBoundingClientRect().top + window.scrollY }
          : null;
      })
      .filter((entry): entry is { id: string; top: number } => entry !== null);
  }

  private updateClock(): void {
    const formatted = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Karachi',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(new Date());
    const time = `${formatted} PKT`;
    this.ngZone.run(() => {
      this.localTime = time;
    });
  }

  toggleMenu(): void {
    if (this.menuOpen) {
      this.closeMenu();
      return;
    }

    this.menuOpen = true;
    this.syncBodyLock();
    window.setTimeout(() => {
      this.mobileNav?.nativeElement.querySelector<HTMLElement>('a, button')?.focus();
    });
  }

  closeMenu(restoreFocus = false): void {
    if (!this.menuOpen) {
      return;
    }
    this.menuOpen = false;
    this.syncBodyLock();
    if (restoreFocus) {
      this.menuToggle?.nativeElement.focus();
    }
  }

  goToSection(id: string): void {
    this.closeMenu();
    this.navigateTo(id);
  }

  private navigateTo(id: string): void {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const headerOffset = window.innerWidth <= 1024 ? 86 : 104;
    const top =
      id === 'hero'
        ? 0
        : target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }

  openPalette(): void {
    if (this.paletteOpen) {
      return;
    }
    this.lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    this.paletteOpen = true;
    this.paletteQuery = '';
    this.paletteIndex = 0;
    this.closeMenu();
    this.syncBodyLock();
    window.setTimeout(() => this.paletteInput?.nativeElement.focus());
  }

  closePalette(): void {
    if (!this.paletteOpen) {
      return;
    }
    this.paletteOpen = false;
    this.syncBodyLock();
    const previous = this.lastFocused;
    const focusTarget =
      previous && previous !== document.body && previous.isConnected
        ? previous
        : this.paletteTrigger?.nativeElement;

    // Wait for Angular to remove the inert state from the page before restoring focus.
    window.setTimeout(() => focusTarget?.focus());
  }

  togglePalette(): void {
    if (this.paletteOpen) {
      this.closePalette();
    } else {
      this.openPalette();
    }
  }

  onPaletteInput(): void {
    this.paletteIndex = 0;
    this.scrollActivePaletteIntoView();
  }

  movePaletteSelection(direction: 1 | -1): void {
    const items = this.filteredPaletteItems;
    if (!items.length) {
      return;
    }
    this.paletteIndex = (this.paletteIndex + direction + items.length) % items.length;
    this.scrollActivePaletteIntoView();
  }

  runPaletteItem(item: PaletteEntry): void {
    this.closePalette();
    window.setTimeout(() => item.action());
  }

  runActivePaletteItem(): void {
    const item = this.filteredPaletteItems[this.paletteIndex];
    if (item) {
      this.runPaletteItem(item);
    }
  }

  private handlePaletteKeyboard(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.closePalette();
        break;
      case 'Tab':
        this.trapPaletteFocus(event);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.movePaletteSelection(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.movePaletteSelection(-1);
        break;
      case 'Home':
        event.preventDefault();
        this.paletteIndex = 0;
        this.scrollActivePaletteIntoView();
        break;
      case 'End':
        event.preventDefault();
        this.paletteIndex = Math.max(this.filteredPaletteItems.length - 1, 0);
        this.scrollActivePaletteIntoView();
        break;
      case 'Enter':
        event.preventDefault();
        this.runActivePaletteItem();
        break;
      default:
        break;
    }
  }

  private trapPaletteFocus(event: KeyboardEvent): void {
    const dialog = document.getElementById('command-palette');
    if (!dialog) {
      return;
    }

    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>('input, button, a[href], [tabindex]')
    ).filter(
      element =>
        !element.hasAttribute('disabled') &&
        element.tabIndex >= 0 &&
        element.getClientRects().length > 0
    );

    if (!focusable.length) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private scrollActivePaletteIntoView(): void {
    const id = this.activePaletteId;
    if (!id) {
      return;
    }
    window.setTimeout(() => {
      document
        .getElementById(`palette-item-${id}`)
        ?.scrollIntoView({ block: 'nearest' });
    });
  }

  async copyEmail(): Promise<void> {
    const copied = await this.clipboard.copy(this.email);
    this.showToast(
      copied ? 'Email address copied to your clipboard.' : `Copy failed. Email: ${this.email}`
    );
  }

  private showToast(message: string): void {
    if (this.toastTimer) {
      window.clearTimeout(this.toastTimer);
    }
    this.toast = message;
    this.toastTimer = window.setTimeout(() => {
      this.ngZone.run(() => {
        this.toast = '';
      });
    }, 3600);
  }

  private syncBodyLock(): void {
    const shouldLock = this.menuOpen || this.paletteOpen;

    if (shouldLock && !this.scrollLocked) {
      this.lockedScrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${this.lockedScrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      this.scrollLocked = true;
      return;
    }

    if (!shouldLock && this.scrollLocked) {
      this.resetBodyLockStyles();
      this.scrollLocked = false;
      window.scrollTo(0, this.lockedScrollY);
    }
  }

  private resetBodyLockStyles(): void {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
  }
}
