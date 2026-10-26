import { Component, HostListener, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'MyWebsite-UI';
  menuOpen = false;
  readonly currentYear = new Date().getFullYear();

  readonly navItems = [
    { href: '#services', label: 'Services' },
    { href: '#work', label: 'Work' },
    { href: '#skills', label: 'Skills' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' }
  ];

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    this.syncBodyScroll();
  }

  closeMenu(): void {
    if (!this.menuOpen) {
      return;
    }
    this.menuOpen = false;
    this.syncBodyScroll();
  }

  scrollToSection(event: Event, href: string): void {
    event.preventDefault();
    this.closeMenu();
    const id = href.replace('#', '');
    const target = document.getElementById(id);
    if (!target) {
      return;
    }
    const headerOffset = 76;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  private syncBodyScroll(): void {
    document.body.style.overflow = this.menuOpen ? 'hidden' : '';
  }
}
