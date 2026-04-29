import { QualityGateService } from './quality-gate.service';

describe('QualityGateService', () => {
  let service: QualityGateService;

  beforeEach(() => {
    service = new QualityGateService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a quality gate', () => {
    const gate = service.currentGate();
    expect(gate).toBeDefined();
    expect(gate.checks.length).toBeGreaterThan(0);
  });

  it('should track passed checks', () => {
    const passed = service.passedChecks();
    expect(passed).toBeGreaterThanOrEqual(0);
  });

  it('should track failed checks', () => {
    const failed = service.failedChecks();
    expect(failed).toBeGreaterThanOrEqual(0);
  });

  it('should simulate change without errors', () => {
    expect(() => service.simulateChange()).not.toThrow();
  });

  it('should have valid gate status', () => {
    const gate = service.currentGate();
    expect(['passed', 'failed', 'warning']).toContain(gate.status);
  });
});
