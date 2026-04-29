export interface BuildStatus {
  id: string;
  project: string;
  status: 'success' | 'failure' | 'running' | 'pending';
  lastRun: Date;
  duration: number;
  nodeVersion: string;
  branch: string;
}
