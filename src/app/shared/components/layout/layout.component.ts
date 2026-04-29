import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
  ],
  template: `
    <mat-sidenav-container class="h-screen">
      <mat-sidenav #sidenav mode="side" opened class="w-64 bg-surface-container">
        <div class="flex items-center gap-3 p-4 border-b border-outline-variant">
          <mat-icon class="text-primary">automation</mat-icon>
          <span class="text-lg font-semibold">Auto Dashboard</span>
        </div>

        <nav mat-list class="pt-2">
          @for (item of navItems; track item.route) {
            <a
              mat-list-item
              [routerLink]="item.route"
              routerLinkActive
              #rla="routerLinkActive"
              [activated]="rla.isActive"
              class="mx-2 my-1 rounded-lg"
            >
              <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
              <span matListItemTitle>{{ item.label }}</span>
            </a>
          }
        </nav>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar class="bg-surface-container-high border-b border-outline-variant">
          <button mat-icon-button (click)="sidenav.toggle()" class="lg:hidden">
            <mat-icon>menu</mat-icon>
          </button>
          <span class="flex-1"></span>
          <button mat-icon-button aria-label="Notifications">
            <mat-icon>notifications</mat-icon>
          </button>
          <button mat-icon-button aria-label="Settings">
            <mat-icon>settings</mat-icon>
          </button>
        </mat-toolbar>

        <main class="p-6 bg-surface">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100vh;
      }
      mat-sidenav-container {
        height: 100%;
      }
      .mat-mdc-list-item.activated {
        background-color: var(--mat-sys-primary-container);
        color: var(--mat-sys-on-primary-container);
      }
    `,
  ],
})
export class LayoutComponent {
  readonly navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/' },
    { label: 'Pipelines', icon: 'account_tree', route: '/pipelines' },
    { label: 'Tests & Coverage', icon: 'fact_check', route: '/tests' },
    { label: 'Pokédex', icon: 'catching_pokemon', route: '/pokemon' },
    { label: 'Settings', icon: 'settings', route: '/settings' },
  ];
}
