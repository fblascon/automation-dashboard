export interface QualityGate {
  status: 'passed' | 'failed' | 'warning';
  checks: QualityCheck[];
}

export interface QualityCheck {
  name: string;
  status: 'passed' | 'failed' | 'warning';
  value: string;
  threshold: string;
  description: string;
}
