import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { DeployService } from '../../core/services/deploy.service';

@Component({
  selector: 'app-deploy-history',
  imports: [MatCardModule, MatIconModule, MatChipsModule, CommonModule],
  template: `
    <mat-card class="h-full">
      <mat-card-header>
        <mat-card-title class="text-sm font-medium">Deploy History</mat-card-title>
        <mat-card-subtitle>Últimos despliegues</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content class="pt-4">
        <div class="text-center mb-3">
          <div
            class="text-3xl font-bold"
            [ngClass]="{
              'text-green-600': successRate() >= 80,
              'text-yellow-600': successRate() >= 60,
              'text-red-600': successRate() < 60,
            }"
          >
            {{ successRate() }}%
          </div>
          <div class="text-xs text-on-surface-variant">Deploy Success Rate</div>
        </div>
        <div class="space-y-2">
          @for (deploy of deploys().slice(0, 4); track deploy.id) {
            <div class="flex items-center gap-3 p-2 rounded-lg bg-surface-container-low">
              <mat-icon
                class="text-base"
                [ngClass]="{
                  'text-green-500': deploy.status === 'success',
                  'text-red-500': deploy.status === 'failure',
                  'text-orange-500': deploy.status === 'rollback',
                  'text-blue-500': deploy.status === 'running',
                }"
              >
                {{
                  deploy.status === 'success'
                    ? 'cloud_done'
                    : deploy.status === 'failure'
                      ? 'cloud_off'
                      : deploy.status === 'rollback'
                        ? 'restore'
                        : 'cloud_upload'
                }}
              </mat-icon>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <span class="text-sm font-medium truncate">{{ deploy.version }}</span>
                  <span
                    class="text-xs px-1.5 py-0.5 rounded"
                    [ngClass]="{
                      'bg-green-100 text-green-700': deploy.environment === 'production',
                      'bg-yellow-100 text-yellow-700': deploy.environment === 'staging',
                      'bg-blue-100 text-blue-700': deploy.environment === 'development',
                    }"
                    >{{ deploy.environment }}</span
                  >
                </div>
                <div class="text-xs text-on-surface-variant">
                  {{ deploy.deployedBy }} · {{ deploy.deployedAt | date: 'short' }}
                </div>
              </div>
            </div>
          }
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class DeployHistoryComponent {
  private readonly service = inject(DeployService);
  readonly deploys = this.service.allDeploys;
  readonly successRate = this.service.successRate;
}
