// Copyright 2025, University of Colorado Boulder

/**
 * Playwright configuration for Forces and Motion Basics
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

// Use a try-catch to handle when @playwright/test isn't installed yet
let defineConfig;
let
  devices;
try {
  const playwright = require( '@playwright/test' );
  defineConfig = playwright.defineConfig;
  devices = playwright.devices;
}
catch( e ) {
  // Fallback for when @playwright/test isn't installed
  defineConfig = config => config;
  devices = { 'Desktop Chrome': {}, 'Desktop Firefox': {}, 'Desktop Safari': {} };
}

module.exports = defineConfig( {
  // Test directory
  testDir: './tests',

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use. See https://playwright.dev/docs/test-reporters
  reporter: 'html',

  // Shared settings for all the projects below
  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: 'http://localhost',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Take screenshot only when test fails
    screenshot: 'only-on-failure',

    // Record video only when test fails
    video: 'retain-on-failure'
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices[ 'Desktop Chrome' ] }
    }

    // {
    //   name: 'firefox',
    //   use: { ...devices[ 'Desktop Firefox' ] }
    // },
    //
    // {
    //   name: 'webkit',
    //   use: { ...devices[ 'Desktop Safari' ] }
    // }
  ]

  // Run your local dev server before starting the tests
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
} );