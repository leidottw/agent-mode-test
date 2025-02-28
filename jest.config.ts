import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts', '<rootDir>/src/test-setup.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@testing/(.*)$': '<rootDir>/src/testing/$1',
    '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
    '^@environment/(.*)$': '<rootDir>/src/environments/$1',
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  transform: {
    '^.+\\.(ts|js|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
};

export default config;
