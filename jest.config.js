/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  transform: {
    '^.+.(t|j)sx?$': ['@swc/jest'],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  extensionsToTreatAsEsm: ['.ts'],
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 80,
      statements: 100,
    },
  },
};
