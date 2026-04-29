import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { QualityGateService } from '../../core/services/quality-gate.service';

@Component({
  selector: 'app-quality-gate-card',
  imports: [MatCardModule, MatIconModule, MatListModule, CommonModule],
  template: `
    <mat-card class="h-full">
      <mat-card-header>
        <mat-card-title class="text-sm font-medium">Quality Gate</mat-card-title>
        <mat-card-subtitle>
          <div class="flex items-center gap-1">
            <mat-icon
              class="text-base"
              [ngClass]="{
                'text-green-500': gate().status === 'passed',
                'text-red-500': gate().status === 'failed',
                'text-yellow-500': gate().status === 'warning',
              }"
            >
              {{
                gate().status === 'passed'
                  ? 'verified'
                  : gate().status === 'failed'
                    ? 'cancel'
                    : 'warning'
              }}
            </mat-icon>
            {{ gate().status | titlecase }}
          </div>
        </mat-card-subtitle>
      </mat-card-header>
      <mat-card-content class="pt-4">
        <div class="flex items-center justify-between mb-3 text-xs">
          <span class="text-green-600 font-medium">{{ passed() }} passed</span>
          <span class="text-red-600 font-medium">{{ failed() }} failed</span>
        </div>
        <mat-list class="!p-0 space-y-1">
          @for (check of gate().checks.slice(0, 4); track check.name) {
            <mat-list-item class="!rounded-lg">
              <mat-icon
                matListItemIcon
                class="text-base"
                [ngClass]="{
                  'text-green-500': check.status === 'passed',
                  'text-red-500': check.status === 'failed',
                  'text-yellow-500': check.status === 'warning',
                }"
              >
                {{
                  check.status === 'passed'
                    ? 'check_circle'
                    : check.status === 'failed'
                      ? 'error'
                      : 'warning'
                }}
              </mat-icon>
              <div matListItemTitle class="text-sm">{{ check.name }}</div>
              <div matListItemLine class="text-xs text-on-surface-variant">
                {{ check.value }} / {{ check.threshold }}
              </div>
            </mat-list-item>
          }
        </mat-list>
      </mat-card-content>
    </mat-card>
  `,
})
export class QualityGateCardComponent {
  private readonly service = inject(QualityGateService);
  readonly gate = this.service.currentGate;
  readonly passed = this.service.passedChecks;
  readonly failed = this.service.failedChecks;
}
