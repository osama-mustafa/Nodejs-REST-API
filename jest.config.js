/** @type {import('jest').Config} */
const config = {
    verbose: true,
    injectGlobals: true,
    testEnvironment: 'node',
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    openHandlesTimeout: 0
};

module.exports = config;

