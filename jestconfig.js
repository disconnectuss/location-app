module.exports = {
    preset: 'ts-jest', // or next/jest if using next/jest
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/app/$1',
    },
  };
  
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']