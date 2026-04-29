import { Injectable, signal } from '@angular/core';
import { Pipeline, PipelineStep } from '../models/pipeline.model';

@Injectable({ providedIn: 'root' })
export class PipelineService {
  private pipelines = signal<Pipeline[]>([
    {
      id: '1',
      name: 'CI Pipeline',
      status: 'success',
      branch: 'main',
      commit: 'a1b2c3d',
      author: 'Eloy',
      startedAt: new Date(Date.now() - 1000 * 60 * 20),
      duration: 245,
      steps: [
        { id: 's1', name: 'Checkout', status: 'success', duration: 12 },
        { id: 's2', name: 'Install Dependencies', status: 'success', duration: 45 },
        { id: 's3', name: 'Lint & Format', status: 'success', duration: 18 },
        { id: 's4', name: 'Unit Tests', status: 'success', duration: 89 },
        { id: 's5', name: 'E2E Tests', status: 'success', duration: 67 },
        { id: 's6', name: 'Build Production', status: 'success', duration: 34 },
      ],
    },
    {
      id: '2',
      name: 'Deploy to Staging',
      status: 'failure',
      branch: 'develop',
      commit: 'e4f5g6h',
      author: 'Maria',
      startedAt: new Date(Date.now() - 1000 * 60 * 60),
      duration: 180,
      steps: [
        { id: 's1', name: 'Checkout', status: 'success', duration: 10 },
        { id: 's2', name: 'Install Dependencies', status: 'success', duration: 42 },
        { id: 's3', name: 'Lint & Format', status: 'success', duration: 15 },
        { id: 's4', name: 'Unit Tests', status: 'failure', duration: 56 },
        { id: 's5', name: 'E2E Tests', status: 'skipped', duration: 0 },
        { id: 's6', name: 'Build Production', status: 'skipped', duration: 0 },
      ],
    },
    {
      id: '3',
      name: 'Release Pipeline',
      status: 'running',
      branch: 'release/v1.2.0',
      commit: 'i7j8k9l',
      author: 'Carlos',
      startedAt: new Date(Date.now() - 1000 * 60 * 8),
      duration: 156,
      steps: [
        { id: 's1', name: 'Checkout', status: 'success', duration: 11 },
        { id: 's2', name: 'Install Dependencies', status: 'success', duration: 44 },
        { id: 's3', name: 'Lint & Format', status: 'success', duration: 17 },
        { id: 's4', name: 'Unit Tests', status: 'success', duration: 78 },
        { id: 's5', name: 'E2E Tests', status: 'running', duration: 0 },
        { id: 's6', name: 'Build Production', status: 'pending', duration: 0 },
      ],
    },
  ]);

  readonly allPipelines = this.pipelines;

  getPipelineById(id: string) {
    return this.pipelines().find((p) => p.id === id);
  }

  simulateProgress() {
    const pipelines = [...this.pipelines()];
    const runningIdx = pipelines.findIndex((p) => p.status === 'running');
    if (runningIdx !== -1) {
      const pipeline = pipelines[runningIdx];
      const steps = [...pipeline.steps];
      const runningStepIdx = steps.findIndex((s) => s.status === 'running');
      if (runningStepIdx !== -1 && runningStepIdx < steps.length - 1) {
        steps[runningStepIdx] = {
          ...steps[runningStepIdx],
          status: 'success' as const,
          duration: Math.floor(Math.random() * 60) + 30,
        };
        steps[runningStepIdx + 1] = { ...steps[runningStepIdx + 1], status: 'running' as const };
      }
      pipelines[runningIdx] = { ...pipeline, steps };
      this.pipelines.set(pipelines);
    }
  }
}
