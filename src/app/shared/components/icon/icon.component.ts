import { Component, Input } from '@angular/core';

export type IconName =
  | 'arrow-right'
  | 'arrow-up-right'
  | 'arrow-down'
  | 'arrow-up'
  | 'search'
  | 'command'
  | 'copy'
  | 'check'
  | 'mail'
  | 'phone'
  | 'pin'
  | 'github'
  | 'clock'
  | 'menu'
  | 'close'
  | 'send'
  | 'external'
  | 'server'
  | 'network'
  | 'window'
  | 'layers'
  | 'wrench'
  | 'code'
  | 'database'
  | 'spark';

@Component({
  selector: 'app-icon',
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false">
      <ng-container [ngSwitch]="name">
        <ng-container *ngSwitchCase="'arrow-right'">
          <path d="M4 12h16" />
          <path d="m14 6 6 6-6 6" />
        </ng-container>

        <ng-container *ngSwitchCase="'arrow-up-right'">
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </ng-container>

        <ng-container *ngSwitchCase="'arrow-down'">
          <path d="M12 4v16" />
          <path d="m6 14 6 6 6-6" />
        </ng-container>

        <ng-container *ngSwitchCase="'arrow-up'">
          <path d="M12 20V4" />
          <path d="m6 10 6-6 6 6" />
        </ng-container>

        <ng-container *ngSwitchCase="'search'">
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4.5 4.5" />
        </ng-container>

        <ng-container *ngSwitchCase="'command'">
          <path d="M9 6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3Z" />
        </ng-container>

        <ng-container *ngSwitchCase="'copy'">
          <rect x="8" y="8" width="11" height="11" rx="2" />
          <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
        </ng-container>

        <ng-container *ngSwitchCase="'check'">
          <path d="m4.5 12.5 5 5 10-11" />
        </ng-container>

        <ng-container *ngSwitchCase="'mail'">
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="m4 7 8 6 8-6" />
        </ng-container>

        <ng-container *ngSwitchCase="'phone'">
          <path d="M7.2 3.5h3l1.4 4-2 1.5a15 15 0 0 0 5.4 5.4l1.5-2 4 1.4v3a2.7 2.7 0 0 1-2.9 2.7A16.7 16.7 0 0 1 4.5 6.4 2.7 2.7 0 0 1 7.2 3.5Z" />
        </ng-container>

        <ng-container *ngSwitchCase="'pin'">
          <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.4" />
        </ng-container>

        <ng-container *ngSwitchCase="'github'">
          <path
            fill="currentColor"
            stroke="none"
            d="M12 .7A11.3 11.3 0 0 0 .7 12a11.3 11.3 0 0 0 7.7 10.7c.6.1.8-.2.8-.5v-2.1c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.3-1.6-1.3-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.5.1-3 0 0 1-.3 3.1 1.2a10.7 10.7 0 0 1 5.6 0c2.2-1.5 3.1-1.2 3.1-1.2.6 1.5.2 2.7.1 3 .7.8 1.1 1.8 1.1 3 0 4.3-2.6 5.2-5.1 5.5.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5A11.3 11.3 0 0 0 23.3 12 11.3 11.3 0 0 0 12 .7Z" />
        </ng-container>

        <ng-container *ngSwitchCase="'clock'">
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7v5.3l3.5 2" />
        </ng-container>

        <ng-container *ngSwitchCase="'menu'">
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h10" />
        </ng-container>

        <ng-container *ngSwitchCase="'close'">
          <path d="m6 6 12 12" />
          <path d="M18 6 6 18" />
        </ng-container>

        <ng-container *ngSwitchCase="'send'">
          <path d="m3.5 11.5 16.8-7.3-4.6 15.3-3.7-6.3-8.5-1.7Z" />
          <path d="m12 13.2 8.3-9" />
        </ng-container>

        <ng-container *ngSwitchCase="'external'">
          <path d="M14 4h6v6" />
          <path d="M20 4 11 13" />
          <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
        </ng-container>

        <ng-container *ngSwitchCase="'server'">
          <rect x="3.5" y="4" width="17" height="6" rx="1.5" />
          <rect x="3.5" y="14" width="17" height="6" rx="1.5" />
          <path d="M7 7h.01M7 17h.01M11 7h5M11 17h5" />
        </ng-container>

        <ng-container *ngSwitchCase="'network'">
          <rect x="9" y="3" width="6" height="5" rx="1.5" />
          <rect x="3" y="16" width="6" height="5" rx="1.5" />
          <rect x="15" y="16" width="6" height="5" rx="1.5" />
          <path d="M12 8v4M6 16v-2h12v2" />
        </ng-container>

        <ng-container *ngSwitchCase="'window'">
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <path d="M3 9h18" />
          <path d="M6.5 6.5h.01M9.5 6.5h.01M12.5 6.5h.01" />
        </ng-container>

        <ng-container *ngSwitchCase="'layers'">
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3.5 12.3 8.5 4.7 8.5-4.7" />
          <path d="m3.5 16.5 8.5 4.7 8.5-4.7" />
        </ng-container>

        <ng-container *ngSwitchCase="'wrench'">
          <path d="M14.5 6.5a4.5 4.5 0 0 0-6.2 5.5L3.5 17a2.1 2.1 0 0 0 3 3l5-4.8a4.5 4.5 0 0 0 5.5-6.2l-3 3-2.5-2.5 3-3Z" />
        </ng-container>

        <ng-container *ngSwitchCase="'code'">
          <path d="m8 8-4 4 4 4" />
          <path d="m16 8 4 4-4 4" />
          <path d="m13.5 5-3 14" />
        </ng-container>

        <ng-container *ngSwitchCase="'database'">
          <ellipse cx="12" cy="5.5" rx="7.5" ry="3" />
          <path d="M4.5 5.5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" />
          <path d="M4.5 11.5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" />
        </ng-container>

        <ng-container *ngSwitchCase="'spark'">
          <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
        </ng-container>
      </ng-container>
    </svg>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        width: 1em;
        height: 1em;
        flex: none;
        line-height: 0;
      }

      svg {
        width: 100%;
        height: 100%;
      }
    `
  ]
})
export class IconComponent {
  @Input() name: IconName = 'arrow-right';
}
