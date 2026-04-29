import { Injectable, signal } from '@angular/core';
import { QualityGate, QualityCheck } from '../models/quality-gate.model';

@Injectable({ providedIn: 'root' })
export class QualityGateService {
  private gate = signal<QualityGate>({
    status: 'passed',
    checks: [
      {
        name: 'Code Coverage',
        status: 'passed',
        value: '87.5%',
        threshold: '>= 80%',
        description: 'Overall test coverage must be above 80%',
      },
      {
        name: 'Lint Errors',
        status: 'passed',
        value: '0',
        threshold: '= 0',
        description: 'No ESLint errors allowed',
      },
      {
        name: 'Type Check',
        status: 'passed',
        value: '0',
        threshold: '= 0',
        description: 'No TypeScript type errors',
      },
      {
        name: 'Bundle Size',
        status: 'warning',
        value: '485 KB',
        threshold: '< 500 KB',
        description: 'Initial bundle size under 500KB',
      },
      {
        name: 'Security Issues',
        status: 'passed',
        value: '0',
        threshold: '= 0',
        description: 'No critical or high security vulnerabilities',
      },
      {
        name: 'Code Duplication',
        status: 'passed',
        value: '2.3%',
        threshold: '< 5%',
        description: 'Duplicated code must be below 5%',
      },
      {
        name: 'Technical Debt',
        status: 'passed',
        value: '1h 23m',
        threshold: '< 2h',
        description: 'Estimated time to fix all code smells',
      },
    ],
  });

  readonly currentGate = this.gate;

  readonly passedChecks = signal(0);
  readonly failedChecks = signal(0);

  constructor() {
    this.updateCounts();
  }

  private updateCounts() {
    const checks = this.gate().checks;
    this.passedChecks.set(checks.filter((c) => c.status === 'passed').length);
    this.failedChecks.set(checks.filter((c) => c.status === 'failed').length);
  }

  simulateChange() {
    const gate = this.gate();
    const checks = [...gate.checks];
    const idx = Math.floor(Math.random() * checks.length);
    const statuses: QualityCheck['status'][] = ['passed', 'failed', 'warning'];
    checks[idx] = {
      ...checks[idx],
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };
    const overallStatus = checks.some((c) => c.status === 'failed')
      ? 'failed'
      : checks.some((c) => c.status === 'warning')
        ? 'warning'
        : 'passed';
    this.gate.set({ ...gate, status: overallStatus, checks });
    this.updateCounts();
  }
}
