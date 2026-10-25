import { Component } from '@angular/core';
import { STACK_MARQUEE } from '../content/portfolio-content';
import type { LayerId } from '../content/portfolio-content';
import type { IconName } from '../shared/components/icon/icon.component';

interface StackLayer {
  id: LayerId;
  title: string;
  detail: string;
  state: string;
  icon: IconName;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  readonly stack = STACK_MARQUEE;
  readonly layers: StackLayer[] = [
    {
      id: 'interface',
      title: 'Interface',
      detail: 'Angular · JavaScript · HTML / CSS',
      state: 'UX',
      icon: 'window'
    },
    {
      id: 'service',
      title: 'Services & APIs',
      detail: 'C# · .NET · ASP.NET Web API',
      state: 'CORE',
      icon: 'server'
    },
    {
      id: 'data',
      title: 'Data',
      detail: 'SQL · MySQL · Entity Framework',
      state: 'DATA',
      icon: 'database'
    }
  ];

  activeLayer: LayerId = 'service';

  get activeLayerLabel(): string {
    return this.layers.find(layer => layer.id === this.activeLayer)?.title ?? '';
  }

  selectLayer(id: LayerId): void {
    this.activeLayer = id;
  }
}
