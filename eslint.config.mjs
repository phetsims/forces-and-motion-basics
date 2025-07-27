// Copyright 2024, University of Colorado Boulder

/**
 * ESLint configuration for forces-and-motion-basics.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import simEslintConfig from '../perennial-alias/js/eslint/config/sim.eslint.config.mjs';

export default [
  ...simEslintConfig,
  {
    ignores: [
      'playwright.config.js',
      'playwright-report/',
      'test-results/'
    ]
  }
];