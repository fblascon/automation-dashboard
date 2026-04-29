export interface Pipeline {
  id: string;
  name: string;
  status: 'success' | 'failure' | 'running' | 'pending' | 'cancelled';
  branch: string;
  commit: string;
  author: string;
  startedAt: Date;
  duration: number;
  steps: PipelineStep[];
}

export interface PipelineStep {
  id: string;
  name: string;
  status: 'success' | 'failure' | 'running' | 'pending' | 'skipped';
  duration: number;
  logs?: string[];
}
