import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { PipelineService } from '../../core/services/pipeline.service';

@Component({
  selector: 'app-pipelines',
  imports: [MatCardModule, MatIconModule, MatChipsModule, MatProgressBarModule, CommonModule],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold mb-1">Pipelines</h1>
        <p class="text-on-surface-variant">Detalle de todas las ejecuciones de pipelines</p>
      </div>

      @for (pipeline of service.allPipelines(); track pipeline.id) {
        <mat-card>
          <mat-card-header>
            <div class="flex items-center gap-3 w-full">
              <mat-icon
                [ngClass]="{
                  'text-green-500': pipeline.status === 'success',
                  'text-red-500': pipeline.status === 'failure',
                  'text-blue-500': pipeline.status === 'running',
                }"
              >
                {{
                  pipeline.status === 'success'
                    ? 'check_circle'
                    : pipeline.status === 'failure'
                      ? 'error'
                      : 'sync'
                }}
              </mat-icon>
              <div class="flex-1">
                <mat-card-title>{{ pipeline.name }}</mat-card-title>
                <mat-card-subtitle>
                  {{ pipeline.branch }} · {{ pipeline.commit }} · by {{ pipeline.author }}
                </mat-card-subtitle>
              </div>
              <span class="text-sm text-on-surface-variant">{{ pipeline.duration }}s</span>
            </div>
          </mat-card-header>
          <mat-card-content class="pt-4">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              @for (step of pipeline.steps; track step.id) {
                <div class="p-3 rounded-lg bg-surface-container-low text-center">
                  <mat-icon
                    class="text-2xl mb-1"
                    [ngClass]="{
                      'text-green-500': step.status === 'success',
                      'text-red-500': step.status === 'failure',
                      'text-blue-500 animate-spin': step.status === 'running',
                      'text-gray-300': step.status === 'skipped' || step.status === 'pending',
                    }"
                  >
                    {{
                      step.status === 'success'
                        ? 'check_circle'
                        : step.status === 'failure'
                          ? 'error'
                          : step.status === 'running'
                            ? 'pending'
                            : 'radio_button_unchecked'
                    }}
                  </mat-icon>
                  <div class="text-xs font-medium">{{ step.name }}</div>
                  @if (step.duration > 0) {
                    <div class="text-xs text-on-surface-variant">{{ step.duration }}s</div>
                  }
                </div>
              }
            </div>
          </mat-card-content>
        </mat-card>
      }
    </div>
  `,
})
export class PipelinesComponent {
  readonly service = inject(PipelineService);
}
