import { Component } from '@angular/core';
import { CASE_STUDIES } from '../content/portfolio-content';
import type { CaseStudy } from '../content/portfolio-content';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  readonly cases = CASE_STUDIES;
  selectedId = CASE_STUDIES[0].id;

  readonly documents = [
    { name: 'Document set A', meta: 'management', state: 'Ready' },
    { name: 'Scan batch 07', meta: 'processing', state: 'Running' },
    { name: 'Import queue', meta: 'automation', state: 'Queued' }
  ];

  readonly reportRows = [
    { batch: 'Batch 01', scope: 'Operations', status: 'XLSX' },
    { batch: 'Batch 02', scope: 'Review', status: 'PDF' },
    { batch: 'Batch 03', scope: 'Archive', status: 'Queued' }
  ];

  get selected(): CaseStudy {
    return this.cases.find(item => item.id === this.selectedId) ?? this.cases[0];
  }

  get selectedIndex(): number {
    return Math.max(0, this.cases.findIndex(item => item.id === this.selectedId));
  }

  select(id: string): void {
    this.selectedId = id;
  }

  selectFromEvent(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.select(value);
  }

  onTabKeydown(event: KeyboardEvent, index: number): void {
    const keys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'];
    if (!keys.includes(event.key)) {
      return;
    }

    event.preventDefault();
    let nextIndex = index;

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      nextIndex = (index + 1) % this.cases.length;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + this.cases.length) % this.cases.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = this.cases.length - 1;
    }

    this.selectedId = this.cases[nextIndex].id;
    window.setTimeout(() => {
      document.getElementById(`work-tab-${this.cases[nextIndex].id}`)?.focus();
    });
  }
}
