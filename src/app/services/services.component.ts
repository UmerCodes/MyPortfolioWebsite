import { Component } from '@angular/core';
import { SERVICES } from '../content/portfolio-content';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  readonly services = SERVICES;
}
