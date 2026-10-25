import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ResumeComponent } from './resume/resume.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { IconComponent } from './shared/components/icon/icon.component';
import { RevealDirective } from './shared/directives/reveal.directive';
import { ScrollProgressDirective } from './shared/directives/scroll-progress.directive';
import { SpotlightDirective } from './shared/directives/spotlight.directive';
import { TiltDirective } from './shared/directives/tilt.directive';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, FormsModule],
    declarations: [
      AppComponent,
      HomeComponent,
      AboutComponent,
      ResumeComponent,
      PortfolioComponent,
      ServicesComponent,
      ContactComponent,
      IconComponent,
      RevealDirective,
      ScrollProgressDirective,
      SpotlightDirective,
      TiltDirective
    ]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should expose the portfolio title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toContain('Muhammad Umer');
  });

  it('should render the primary navigation', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand__text')?.textContent).toContain('Muhammad Umer');
    expect(compiled.querySelector('.nav-links')).toBeTruthy();
  });
});
