export interface CoverageReport {
  total: number;
  statements: number;
  branches: number;
  functions: number;
  lines: number;
  threshold: number;
  files: CoverageFile[];
}

export interface CoverageFile {
  name: string;
  path: string;
  coverage: number;
  statements: number;
  branches: number;
  functions: number;
  lines: number;
}
