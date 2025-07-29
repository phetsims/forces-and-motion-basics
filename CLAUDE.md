# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Forces and Motion Basics - Development Guide

## Testing Commands

After you have finished making a change, and you believe it is ready for review, run the following commands in this
order to ensure everything is working correctly:

- (optional) `grunt modulify --targets=strings`: Update string subsystems (only if you have modified
  forces-and-motion-basics-strings_en.yaml)
- `grunt type-check`: Run TypeScript type checking
- `grunt lint --fix`: Run and auto-fix linting issues
- (optional) Use the playwright mcp to
  launch, http://localhost/forces-and-motion-basics/forces-and-motion-basics_en.html?brand=phet&ea&debugger&screens=1,2,3,4&logAriaLiveResponses
  - Often, you just need to see if it launches. But if you must interact with playwright for your test, use the keyboard
    only.
  - Change ?screens={number} to test a specific screen. js/netforce is screen 1, js/motion is screen 2-4

## Environment

- This is developed as part of a monorepo. If you need details for any dependencies, you can follow the import paths
  imports. You will be approved to read files outside our working directory.
- When getting the contents of a file, it probably has a *.ts suffix even though it is imported as *.js.
- Read ./doc/model.md and ./doc/implementation-notes.md when you need more context about the simulation.

## Code Style

- Use TypeScript with explicit typing for all properties and parameters
- Access modifiers (`public`, `private`) required for class members
- Class names: PascalCase, Files: kebab-case, Variables/Methods: camelCase
- Properties use PhET's Property system (NumberProperty, BooleanProperty)
- Boolean properties begin with verbs (`is`, `has`, `show`)
- Model classes should never import from view
- Use parameter destructuring for object configs
- Include JSDoc comments for all methods and classes
- Add tandem parameters for PhET-IO integration
- Use explicit file extensions in imports (.js)

## Internationalization (i18n)

- **Source of Truth:** All new strings must be added to the `forces-and-motion-basics-strings_en.yaml` file. The
  `grunt modulify --targets=strings` command will then automatically update the
  `forces-and-motion-basics-strings_en.json` and `ForcesAndMotionBasicsStrings.ts` and `ForcesAndMotionBasicsFluent.ts`
  files.