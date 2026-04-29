import { Injectable, signal } from '@angular/core';
import { Deploy } from '../models/deploy.model';

@Injectable({ providedIn: 'root' })
export class DeployService {
  private deploys = signal<Deploy[]>([
    {
      id: '1',
      environment: 'production',
      status: 'success',
      version: 'v1.1.0',
      deployedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      deployedBy: 'Eloy',
      duration: 180,
      url: 'https://app.example.com',
    },
    {
      id: '2',
      environment: 'staging',
      status: 'success',
      version: 'v1.2.0-rc.1',
      deployedAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
      deployedBy: 'Maria',
      duration: 145,
      url: 'https://staging.example.com',
    },
    {
      id: '3',
      environment: 'production',
      status: 'rollback',
      version: 'v1.0.9',
      deployedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      deployedBy: 'Carlos',
      duration: 90,
      url: 'https://app.example.com',
    },
    {
      id: '4',
      environment: 'development',
      status: 'success',
      version: 'v1.2.0-dev.45',
      deployedAt: new Date(Date.now() - 1000 * 60 * 30),
      deployedBy: 'Eloy',
      duration: 60,
      url: 'https://dev.example.com',
    },
    {
      id: '5',
      environment: 'staging',
      status: 'failure',
      version: 'v1.2.0-rc.2',
      deployedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
      deployedBy: 'Maria',
      duration: 200,
      url: 'https://staging.example.com',
    },
  ]);

  readonly allDeploys = this.deploys;

  readonly successRate = signal(0);

  constructor() {
    this.calculateSuccessRate();
  }

  private calculateSuccessRate() {
    const completed = this.deploys().filter(
      (d) => d.status === 'success' || d.status === 'failure' || d.status === 'rollback',
    );
    if (completed.length === 0) {
      this.successRate.set(0);
      return;
    }
    const success = completed.filter((d) => d.status === 'success').length;
    this.successRate.set(Math.round((success / completed.length) * 100));
  }

  addDeploy(deploy: Deploy) {
    this.deploys.set([deploy, ...this.deploys()]);
    this.calculateSuccessRate();
  }
}
