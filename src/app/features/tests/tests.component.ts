import { Component, inject, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { CoverageService } from '../../core/services/coverage.service';
import { QualityGateService } from '../../core/services/quality-gate.service';

interface MetricRow {
  label: string;
  value: number;
}

@Component({
  selector: 'app-tests',
  imports: [MatCardModule, MatIconModule, MatProgressBarModule, MatTableModule, CommonModule],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold mb-1">Tests & Coverage</h1>
        <p class="text-on-surface-variant">Reporte detallado de cobertura y calidad de tests</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <mat-card>
          <mat-card-header>
            <mat-card-title class="text-sm font-medium">Coverage Summary</mat-card-title>
          </mat-card-header>
          <mat-card-content class="pt-4 space-y-4">
            @for (metric of metrics(); track metric.label) {
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span>{{ metric.label }}</span>
                  <span class="font-medium">{{ metric.value }}%</span>
                </div>
                <mat-progress-bar
                  mode="determinate"
                  [value]="metric.value"
                  [color]="metric.value >= threshold() ? 'accent' : 'warn'"
                />
              </div>
            }
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title class="text-sm font-medium">Quality Gate Status</mat-card-title>
          </mat-card-header>
          <mat-card-content class="pt-4">
            <div class="flex items-center gap-3 mb-4">
              <mat-icon
                class="text-4xl"
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
              <div>
                <div class="text-lg font-semibold">{{ gate().status | titlecase }}</div>
                <div class="text-sm text-on-surface-variant">
                  {{ passed() }}/{{ gate().checks.length }} checks passed
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-card>
        <mat-card-header>
          <mat-card-title class="text-sm font-medium">File Coverage</mat-card-title>
        </mat-card-header>
        <mat-card-content class="pt-4">
          <table mat-table [dataSource]="files()" class="w-full">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>File</th>
              <td mat-cell *matCellDef="let file">{{ file.name }}</td>
            </ng-container>
            <ng-container matColumnDef="path">
              <th mat-header-cell *matHeaderCellDef>Path</th>
              <td mat-cell *matCellDef="let file" class="text-on-surface-variant">
                {{ file.path }}
              </td>
            </ng-container>
            <ng-container matColumnDef="coverage">
              <th mat-header-cell *matHeaderCellDef>Coverage</th>
              <td mat-cell *matCellDef="let file">
                <div class="flex items-center gap-2">
                  <mat-progress-bar
                    mode="determinate"
                    [value]="file.coverage"
                    [color]="file.coverage >= threshold() ? 'accent' : 'warn'"
                    class="flex-1"
                  />
                  <span class="text-sm font-medium w-12">{{ file.coverage }}%</span>
                </div>
              </td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="['name', 'path', 'coverage']"></tr>
            <tr mat-row *matRowDef="let row; columns: ['name', 'path', 'coverage']"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class TestsComponent {
  private readonly coverageService = inject(CoverageService);
  private readonly qualityService = inject(QualityGateService);

  readonly coverage = this.coverageService.currentReport;
  readonly threshold = computed(() => this.coverageService.currentReport().threshold);
  readonly gate = this.qualityService.currentGate;
  readonly passed = this.qualityService.passedChecks;
  readonly files = computed(() => this.coverageService.currentReport().files);

  metrics(): MetricRow[] {
    const report = this.coverage();
    return [
      { label: 'Statements', value: report.statements },
      { label: 'Branches', value: report.branches },
      { label: 'Functions', value: report.functions },
      { label: 'Lines', value: report.lines },
    ];
  }
}
