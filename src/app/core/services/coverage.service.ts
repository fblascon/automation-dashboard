import { Injectable, signal } from '@angular/core';
import { CoverageReport } from '../models/coverage.model';

@Injectable({ providedIn: 'root' })
export class CoverageService {
  private report = signal<CoverageReport>({
    total: 87.5,
    statements: 89.2,
    branches: 82.1,
    functions: 91.4,
    lines: 87.8,
    threshold: 80,
    files: [
      {
        name: 'app.component.ts',
        path: 'src/app/',
        coverage: 95,
        statements: 95,
        branches: 90,
        functions: 100,
        lines: 95,
      },
      {
        name: 'build-status.service.ts',
        path: 'src/app/core/services/',
        coverage: 88,
        statements: 90,
        branches: 85,
        functions: 92,
        lines: 88,
      },
      {
        name: 'pipeline.service.ts',
        path: 'src/app/core/services/',
        coverage: 76,
        statements: 78,
        branches: 70,
        functions: 80,
        lines: 76,
      },
      {
        name: 'dashboard.component.ts',
        path: 'src/app/features/dashboard/',
        coverage: 92,
        statements: 93,
        branches: 88,
        functions: 95,
        lines: 92,
      },
      {
        name: 'quality-gate.component.ts',
        path: 'src/app/features/tests/',
        coverage: 84,
        statements: 85,
        branches: 80,
        functions: 88,
        lines: 84,
      },
    ],
  });

  readonly currentReport = this.report;

  readonly isAboveThreshold = signal(true);

  simulateUpdate() {
    const variation = (Math.random() - 0.5) * 5;
    const current = this.report();
    const newTotal = Math.min(100, Math.max(0, current.total + variation));
    this.report.set({
      ...current,
      total: Math.round(newTotal * 10) / 10,
      statements: Math.min(100, Math.max(0, current.statements + variation * 0.8)),
      branches: Math.min(100, Math.max(0, current.branches + variation * 1.2)),
      functions: Math.min(100, Math.max(0, current.functions + variation * 0.6)),
      lines: Math.min(100, Math.max(0, current.lines + variation * 0.9)),
    });
  }
}
