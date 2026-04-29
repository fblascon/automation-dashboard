export default {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text-summary'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 50,
      functions: 80,
      lines: 80,
    },
  },
};
