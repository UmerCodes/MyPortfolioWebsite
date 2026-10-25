import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ResumeComponent } from './resume/resume.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { IconComponent } from './shared/components/icon/icon.component';
import { RevealDirective } from './shared/directives/reveal.directive';
import { ScrollProgressDirective } from './shared/directives/scroll-progress.directive';
import { SpotlightDirective } from './shared/directives/spotlight.directive';
import { TiltDirective } from './shared/directives/tilt.directive';

@NgModule({
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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
