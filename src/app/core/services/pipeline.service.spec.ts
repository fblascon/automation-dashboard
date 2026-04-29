import { PipelineService } from './pipeline.service';

describe('PipelineService', () => {
  let service: PipelineService;

  beforeEach(() => {
    service = new PipelineService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial pipelines', () => {
    expect(service.allPipelines().length).toBeGreaterThan(0);
  });

  it('should find pipeline by id', () => {
    const pipeline = service.getPipelineById('1');
    expect(pipeline).toBeDefined();
    expect(pipeline?.name).toBe('CI Pipeline');
  });

  it('should return undefined for non-existent pipeline', () => {
    const pipeline = service.getPipelineById('non-existent');
    expect(pipeline).toBeUndefined();
  });

  it('should have steps in each pipeline', () => {
    const pipelines = service.allPipelines();
    pipelines.forEach((p) => {
      expect(p.steps.length).toBeGreaterThan(0);
    });
  });

  it('should simulate progress without errors', () => {
    expect(() => service.simulateProgress()).not.toThrow();
  });
});
