// jest.config.js
module.exports = {
  collectCoverage: true,
  coverageReporters: ["json", "lcov", "text", "clover"],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
