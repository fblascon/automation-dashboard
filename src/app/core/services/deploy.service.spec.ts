import { DeployService } from './deploy.service';

describe('DeployService', () => {
  let service: DeployService;

  beforeEach(() => {
    service = new DeployService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial deploys', () => {
    expect(service.allDeploys().length).toBeGreaterThan(0);
  });

  it('should calculate success rate', () => {
    const rate = service.successRate();
    expect(rate).toBeGreaterThanOrEqual(0);
    expect(rate).toBeLessThanOrEqual(100);
  });

  it('should add a new deploy', () => {
    const before = service.allDeploys().length;
    service.addDeploy({
      id: 'new',
      environment: 'staging',
      status: 'success',
      version: 'v2.0.0',
      deployedAt: new Date(),
      deployedBy: 'Test',
      duration: 100,
      url: 'https://test.example.com',
    });
    expect(service.allDeploys().length).toBe(before + 1);
  });

  it('should have valid environments', () => {
    const deploys = service.allDeploys();
    const validEnvs = ['production', 'staging', 'development'];
    deploys.forEach((d) => {
      expect(validEnvs).toContain(d.environment);
    });
  });
});
