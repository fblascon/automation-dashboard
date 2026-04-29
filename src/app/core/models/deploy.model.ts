export interface Deploy {
  id: string;
  environment: 'production' | 'staging' | 'development';
  status: 'success' | 'failure' | 'running' | 'rollback';
  version: string;
  deployedAt: Date;
  deployedBy: string;
  duration: number;
  url: string;
}
