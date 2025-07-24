# Forces and Motion Basics - Development Guide

## Build Commands

- `grunt type-check`: Run TypeScript type checking

## Environment

- This is developed as part of a monorepo. If you need details of any of the dependencies, you can follow the import
  paths for read-only, but search for the *.ts first.
- When getting the contents of a file, it probably has a *.ts suffix even though it is imported as *.js.
- Read ./doc/model.md and ./doc/implementation-notes.md when you need more context about the simulation.

## Project Structure

- `js/` - TypeScript source code (model/view architecture)
- `images/` - Image assets and generated TypeScript imports

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
- **Source of Truth:** All new strings must be added to the `forces-and-motion-basics-strings_en.yaml` file. The `grunt modulify --targets=strings` command will then automatically update the `membrane-transport-strings_en.json` and `MembraneTransportStrings.ts` files.
- A11y strings often need deeper nesting (component > subcomponent > feature > property)
- When adding new accessibility text, check existing patterns for proper nesting structure

By launching claude like so:

```
claude --add-dir ../graphing-quadratics --add-dir ../center-and-variability/ --add-dir ../beers-law-lab --add-dir ../vector-addition
```

I have added your ability to see to other simulations that we may need to refer to:

- ../graphing-quadratics/
- ../center-and-variability/
- ../beers-law-lab/
- ../vector-addition/
- ../membrane-transport/
