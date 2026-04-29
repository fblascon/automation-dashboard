import { Injectable, signal, computed } from '@angular/core';
import { BuildStatus } from '../models/build-status.model';

@Injectable({ providedIn: 'root' })
export class BuildStatusService {
  private builds = signal<BuildStatus[]>([
    {
      id: '1',
      project: 'automation-dashboard',
      status: 'success',
      lastRun: new Date(Date.now() - 1000 * 60 * 15),
      duration: 124,
      nodeVersion: '20.x',
      branch: 'main',
    },
    {
      id: '2',
      project: 'api-gateway',
      status: 'failure',
      lastRun: new Date(Date.now() - 1000 * 60 * 45),
      duration: 89,
      nodeVersion: '22.x',
      branch: 'develop',
    },
    {
      id: '3',
      project: 'auth-service',
      status: 'running',
      lastRun: new Date(Date.now() - 1000 * 60 * 5),
      duration: 67,
      nodeVersion: '20.x',
      branch: 'feature/oauth2',
    },
    {
      id: '4',
      project: 'notification-worker',
      status: 'success',
      lastRun: new Date(Date.now() - 1000 * 60 * 120),
      duration: 45,
      nodeVersion: '18.x',
      branch: 'main',
    },
    {
      id: '5',
      project: 'data-processor',
      status: 'pending',
      lastRun: new Date(Date.now() - 1000 * 60 * 3),
      duration: 0,
      nodeVersion: '20.x',
      branch: 'main',
    },
  ]);

  readonly allBuilds = this.builds;

  readonly successCount = computed(
    () => this.builds().filter((b) => b.status === 'success').length,
  );

  readonly failureCount = computed(
    () => this.builds().filter((b) => b.status === 'failure').length,
  );

  readonly runningCount = computed(
    () => this.builds().filter((b) => b.status === 'running').length,
  );

  readonly successRate = computed(() => {
    const completed = this.builds().filter((b) => b.status === 'success' || b.status === 'failure');
    if (completed.length === 0) return 0;
    return Math.round((this.successCount() / completed.length) * 100);
  });

  simulateStatusChange() {
    const builds = [...this.builds()];
    const idx = Math.floor(Math.random() * builds.length);
    const statuses: BuildStatus['status'][] = ['success', 'failure', 'running', 'pending'];
    builds[idx] = {
      ...builds[idx],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      lastRun: new Date(),
    };
    this.builds.set(builds);
  }
}
