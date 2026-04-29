import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [
    MatCardModule,
    MatIconModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  template: `
    <div class="space-y-6 max-w-2xl">
      <div>
        <h1 class="text-2xl font-bold mb-1">Settings</h1>
        <p class="text-on-surface-variant">Configuración del dashboard y automatizaciones</p>
      </div>

      <mat-card>
        <mat-card-header>
          <mat-card-title class="text-sm font-medium">General</mat-card-title>
        </mat-card-header>
        <mat-card-content class="pt-4 space-y-4">
          <mat-form-field class="w-full">
            <mat-label>Project Name</mat-label>
            <input matInput value="automation-dashboard" />
          </mat-form-field>

          <mat-form-field class="w-full">
            <mat-label>Coverage Threshold (%)</mat-label>
            <input matInput type="number" value="80" />
          </mat-form-field>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title class="text-sm font-medium">Notifications</mat-card-title>
        </mat-card-header>
        <mat-card-content class="pt-4 space-y-3">
          <mat-slide-toggle checked>Build Failure Alerts</mat-slide-toggle>
          <mat-slide-toggle checked>Deployment Notifications</mat-slide-toggle>
          <mat-slide-toggle>Quality Gate Warnings</mat-slide-toggle>
          <mat-slide-toggle checked>Pipeline Status Changes</mat-slide-toggle>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title class="text-sm font-medium">Integrations</mat-card-title>
        </mat-card-header>
        <mat-card-content class="pt-4 space-y-3">
          <div class="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
            <div class="flex items-center gap-3">
              <mat-icon class="text-green-500">check_circle</mat-icon>
              <div>
                <div class="font-medium">GitHub</div>
                <div class="text-xs text-on-surface-variant">Connected</div>
              </div>
            </div>
            <mat-slide-toggle checked />
          </div>
          <div class="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
            <div class="flex items-center gap-3">
              <mat-icon class="text-green-500">check_circle</mat-icon>
              <div>
                <div class="font-medium">SonarCloud</div>
                <div class="text-xs text-on-surface-variant">Connected</div>
              </div>
            </div>
            <mat-slide-toggle checked />
          </div>
          <div class="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
            <div class="flex items-center gap-3">
              <mat-icon class="text-gray-400">cancel</mat-icon>
              <div>
                <div class="font-medium">Slack</div>
                <div class="text-xs text-on-surface-variant">Not connected</div>
              </div>
            </div>
            <mat-slide-toggle />
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class SettingsComponent {}
