import { Component } from '@angular/core';
import { BuildStatusCardComponent } from './build-status-card.component';
import { CoverageGaugeComponent } from './coverage-gauge.component';
import { PipelineTimelineComponent } from './pipeline-timeline.component';
import { QualityGateCardComponent } from './quality-gate-card.component';
import { DeployHistoryComponent } from './deploy-history.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    BuildStatusCardComponent,
    CoverageGaugeComponent,
    PipelineTimelineComponent,
    QualityGateCardComponent,
    DeployHistoryComponent,
  ],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold mb-1">Automation Dashboard</h1>
        <p class="text-on-surface-variant">
          Monitoreo en tiempo real de tus pipelines y automatizaciones
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <app-build-status-card />
        <app-coverage-gauge />
        <app-quality-gate-card />
        <app-deploy-history />
      </div>

      <app-pipeline-timeline />
    </div>
  `,
})
export class DashboardComponent {}
