import { Component } from '@angular/core';
import { PRINCIPLES } from '../content/portfolio-content';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  readonly principles = PRINCIPLES;
}
