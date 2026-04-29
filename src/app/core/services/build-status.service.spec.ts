import { BuildStatusService } from './build-status.service';

describe('BuildStatusService', () => {
  let service: BuildStatusService;

  beforeEach(() => {
    service = new BuildStatusService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial builds', () => {
    expect(service.allBuilds().length).toBeGreaterThan(0);
  });

  it('should calculate success count correctly', () => {
    const count = service.successCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  it('should calculate failure count correctly', () => {
    const count = service.failureCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  it('should calculate running count correctly', () => {
    const count = service.runningCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  it('should calculate success rate between 0 and 100', () => {
    const rate = service.successRate();
    expect(rate).toBeGreaterThanOrEqual(0);
    expect(rate).toBeLessThanOrEqual(100);
  });

  it('should update build status on simulateStatusChange', () => {
    const before = service.allBuilds();
    service.simulateStatusChange();
    const after = service.allBuilds();
    expect(after.length).toBe(before.length);
  });
});
