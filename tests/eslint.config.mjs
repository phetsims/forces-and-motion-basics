// Copyright 2025, University of Colorado Boulder

/**
 * ESLint configuration for forces-and-motion-basics tests.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import nodeEslintConfig from '../../perennial-alias/js/eslint/config/node.eslint.config.mjs';
import { mutateForNestedConfig } from '../../perennial-alias/js/eslint/config/root.eslint.config.mjs';

export default [
  ...mutateForNestedConfig( nodeEslintConfig ),
  {
    rules: {
      // Allow console.log in tests for debugging
      'no-console': 'off'
    }
  }
];