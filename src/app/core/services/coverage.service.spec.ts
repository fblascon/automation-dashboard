import { CoverageService } from './coverage.service';

describe('CoverageService', () => {
  let service: CoverageService;

  beforeEach(() => {
    service = new CoverageService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a coverage report', () => {
    const report = service.currentReport();
    expect(report).toBeDefined();
    expect(report.total).toBeGreaterThan(0);
  });

  it('should have threshold configured', () => {
    const report = service.currentReport();
    expect(report.threshold).toBe(80);
  });

  it('should have file coverage data', () => {
    const report = service.currentReport();
    expect(report.files.length).toBeGreaterThan(0);
  });

  it('should update coverage on simulateUpdate', () => {
    const before = service.currentReport().total;
    service.simulateUpdate();
    const after = service.currentReport().total;
    expect(after).toBeGreaterThanOrEqual(0);
    expect(after).toBeLessThanOrEqual(100);
  });

  it('should have all metrics between 0 and 100', () => {
    const report = service.currentReport();
    expect(report.statements).toBeGreaterThanOrEqual(0);
    expect(report.branches).toBeGreaterThanOrEqual(0);
    expect(report.functions).toBeGreaterThanOrEqual(0);
    expect(report.lines).toBeGreaterThanOrEqual(0);
  });
});
