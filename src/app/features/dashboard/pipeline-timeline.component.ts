import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { PipelineService } from '../../core/services/pipeline.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pipeline-timeline',
  imports: [MatCardModule, MatIconModule, MatChipsModule, CommonModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title class="text-sm font-medium">Pipeline Timeline</mat-card-title>
        <mat-card-subtitle>Últimas ejecuciones</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content class="pt-4">
        <div class="space-y-4">
          @for (pipeline of service.allPipelines(); track pipeline.id) {
            <div class="flex items-start gap-4 p-3 rounded-lg bg-surface-container-low">
              <div class="flex flex-col items-center">
                <div
                  class="w-3 h-3 rounded-full"
                  [ngClass]="{
                    'bg-green-500': pipeline.status === 'success',
                    'bg-red-500': pipeline.status === 'failure',
                    'bg-blue-500 animate-pulse': pipeline.status === 'running',
                    'bg-gray-400': pipeline.status === 'pending',
                  }"
                ></div>
                @if (!$last) {
                  <div class="w-0.5 h-8 bg-outline-variant mt-1"></div>
                }
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="font-medium">{{ pipeline.name }}</span>
                  <span
                    class="text-xs px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container"
                  >
                    {{ pipeline.branch }}
                  </span>
                  <span class="text-xs text-on-surface-variant font-mono">{{
                    pipeline.commit
                  }}</span>
                </div>
                <div class="flex items-center gap-4 mt-1 text-xs text-on-surface-variant">
                  <span>{{ pipeline.author }}</span>
                  <span>{{ pipeline.duration }}s</span>
                  <span>{{ pipeline.startedAt | date: 'short' }}</span>
                </div>
                <div class="flex gap-1 mt-2">
                  @for (step of pipeline.steps; track step.id) {
                    <mat-icon
                      class="text-base"
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
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class PipelineTimelineComponent {
  readonly service = inject(PipelineService);
}
