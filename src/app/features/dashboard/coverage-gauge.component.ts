import { Component, inject, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CoverageService } from '../../core/services/coverage.service';

@Component({
  selector: 'app-coverage-gauge',
  imports: [MatCardModule, MatIconModule],
  template: `
    <mat-card class="h-full">
      <mat-card-header>
        <mat-card-title class="text-sm font-medium">Code Coverage</mat-card-title>
        <mat-card-subtitle>Cobertura de tests</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content class="pt-4">
        <div class="flex flex-col items-center">
          <div class="relative w-32 h-32">
            <svg class="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="var(--mat-sys-outline-variant)"
                stroke-width="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                [attr.stroke]="coverageColor()"
                stroke-width="8"
                stroke-linecap="round"
                [attr.stroke-dasharray]="circumference"
                [attr.stroke-dashoffset]="dashOffset()"
                transform="rotate(-90 50 50)"
                class="transition-all duration-500"
              />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center">
                <div class="text-2xl font-bold">{{ coverage() }}%</div>
                <div class="text-xs text-on-surface-variant">threshold: {{ threshold() }}%</div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-x-6 gap-y-1 mt-4 text-xs w-full">
            <span class="text-on-surface-variant">Statements</span>
            <span class="text-right font-medium">{{ statements() }}%</span>
            <span class="text-on-surface-variant">Branches</span>
            <span class="text-right font-medium">{{ branches() }}%</span>
            <span class="text-on-surface-variant">Functions</span>
            <span class="text-right font-medium">{{ functions() }}%</span>
            <span class="text-on-surface-variant">Lines</span>
            <span class="text-right font-medium">{{ lines() }}%</span>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class CoverageGaugeComponent {
  private readonly service = inject(CoverageService);
  readonly circumference = 2 * Math.PI * 45;

  readonly report = this.service.currentReport;
  readonly coverage = computed(() => this.report().total);
  readonly threshold = computed(() => this.report().threshold);
  readonly statements = computed(() => this.report().statements);
  readonly branches = computed(() => this.report().branches);
  readonly functions = computed(() => this.report().functions);
  readonly lines = computed(() => this.report().lines);

  coverageColor() {
    const cov = this.coverage();
    if (cov >= 90) return '#22c55e';
    if (cov >= 80) return '#eab308';
    return '#ef4444';
  }

  dashOffset() {
    return this.circumference - (this.coverage() / 100) * this.circumference;
  }
}
