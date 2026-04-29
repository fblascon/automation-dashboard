import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BuildStatusService } from '../../core/services/build-status.service';

@Component({
  selector: 'app-build-status-card',
  imports: [MatCardModule, MatIconModule, MatProgressBarModule],
  template: `
    <mat-card class="h-full">
      <mat-card-header>
        <mat-card-title class="text-sm font-medium">Build Status</mat-card-title>
        <mat-card-subtitle>Últimos builds</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content class="pt-4">
        <div class="flex items-center justify-between mb-4">
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600">{{ service.successCount() }}</div>
            <div class="text-xs text-on-surface-variant">Success</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-red-600">{{ service.failureCount() }}</div>
            <div class="text-xs text-on-surface-variant">Failed</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600">{{ service.runningCount() }}</div>
            <div class="text-xs text-on-surface-variant">Running</div>
          </div>
        </div>
        <div class="mb-2 flex justify-between text-xs">
          <span>Success Rate</span>
          <span class="font-semibold">{{ service.successRate() }}%</span>
        </div>
        <mat-progress-bar
          mode="determinate"
          [value]="service.successRate()"
          [color]="service.successRate() >= 80 ? 'accent' : 'warn'"
        />
      </mat-card-content>
    </mat-card>
  `,
})
export class BuildStatusCardComponent {
  readonly service = inject(BuildStatusService);
}
