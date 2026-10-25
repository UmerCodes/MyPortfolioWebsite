import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesComponent } from './services.component';
import { IconComponent } from '../shared/components/icon/icon.component';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { SpotlightDirective } from '../shared/directives/spotlight.directive';

describe('ServicesComponent', () => {
  let component: ServicesComponent;
  let fixture: ComponentFixture<ServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicesComponent, IconComponent, RevealDirective, SpotlightDirective]
    });
    fixture = TestBed.createComponent(ServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
