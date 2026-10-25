import { Component } from '@angular/core';
import { EXPERIENCE, SKILL_GROUPS } from '../content/portfolio-content';
import type { LayerId, SkillGroup } from '../content/portfolio-content';
import type { IconName } from '../shared/components/icon/icon.component';

interface StackLayerView {
  id: LayerId;
  label: string;
  detail: string;
  icon: IconName;
}

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {
  readonly groups = SKILL_GROUPS;
  readonly experience = EXPERIENCE;
  selectedId = 'backend';

  readonly stackLayers: StackLayerView[] = [
    {
      id: 'interface',
      label: 'Interface',
      detail: 'Angular · JavaScript · HTML / CSS',
      icon: 'window'
    },
    {
      id: 'service',
      label: 'Service layer',
      detail: 'C# · .NET · ASP.NET Web API',
      icon: 'server'
    },
    {
      id: 'data',
      label: 'Data layer',
      detail: 'SQL · MySQL · Entity Framework',
      icon: 'database'
    }
  ];

  get selected(): SkillGroup {
    return this.groups.find(group => group.id === this.selectedId) ?? this.groups[0];
  }

  get selectedIndex(): number {
    return Math.max(this.groups.findIndex(group => group.id === this.selectedId), 0);
  }

  select(id: string): void {
    this.selectedId = id;
  }

  isLayerFocused(id: LayerId): boolean {
    return this.selected.layers.includes(id);
  }

  onTabKeydown(event: KeyboardEvent, index: number): void {
    const keys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'];
    if (!keys.includes(event.key)) {
      return;
    }

    event.preventDefault();
    let nextIndex = index;

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      nextIndex = (index + 1) % this.groups.length;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + this.groups.length) % this.groups.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = this.groups.length - 1;
    }

    this.selectedId = this.groups[nextIndex].id;
    window.setTimeout(() => {
      document.getElementById(`skill-tab-${this.groups[nextIndex].id}`)?.focus();
    });
  }
}
