# Playwright Best Practices Guide

## PhET-Specific Adaptations

### Parallel DOM (PDOM) Structure
PhET simulations use a parallel DOM structure for accessibility, which requires special handling:

1. **Multiple ARIA Live Regions**: PhET uses 8 ARIA live regions (4 polite, 4 assertive)
   - Tests must check ALL regions for announcements
   - Use `locator.all()` to iterate through regions

2. **Duplicate Elements**: Some elements may appear twice in the PDOM
   - Use `.first()` when selecting elements that might have duplicates
   - Check element count with `.count()` before assertions

3. **Dynamic Focus Management**: Focus behavior is managed through the PDOM
   - Tab order follows PDOM structure, not visual layout
   - Focus indicators are separate from the visual elements

### Code Examples for PDOM

```javascript
// Handling multiple ARIA regions
await expect.poll( async () => {
  const regions = await page.locator('[aria-live]').all();
  for ( const region of regions ) {
    const text = await region.textContent();
    if ( text?.includes('Expected text') ) return true;
  }
  return false;
}).toBeTruthy();

// Handling duplicate elements
const puller = page.getByRole('button', { name: /puller name/ }).first();
```

## Summary of Improvements

### 1. **Configuration Updates** (`playwright.config.js`)
- Added explicit timeout configurations:
  - Global test timeout: 30s (prevents hanging tests)
  - Assertion timeout: 5s (faster feedback)
  - Action timeout: 5s (for clicks, types, etc.)
  - Navigation timeout: 30s (for page loads)
- Added viewport consistency (1280x720)
- Added locale and timezone settings
- Environment-specific reporter (dot for CI, HTML for local)
- Added `SLOW_MO` environment variable support for debugging

### 2. **Test Helpers** (`test-helpers.js`)
Created reusable helper functions:
- `waitForAriaAnnouncement()` - Properly wait for accessibility announcements
- `waitForFocus()` - Wait for element to receive focus
- `getFocusedElementInfo()` - Debug helper to see what has focus
- `collectFocusOrder()` - Analyze tab order systematically
- `setupAriaAnnouncementCapture()` - Track console messages
- `waitForElementStable()` - Wait for animations to complete
- `pressKeyAndExpect()` - Press key and verify result
- `verifyPullerLocation()` - Check puller position

### 3. **Removed Anti-Patterns** (`keyboard-navigation.spec.js`)
**Before**: `await page.waitForTimeout(500);` ❌
**After**: `await expect(element).toBeVisible();` ✅

Key improvements:
- Replaced all `waitForTimeout()` with proper wait conditions
- Added `test.step()` for better test structure and reporting
- Used `expect.poll()` for dynamic conditions
- Added test tags (@smoke, @critical, @a11y) for selective runs
- Better error messages with context

### 4. **Page Object Model** (`NetForcePage.js`)
Benefits:
- Centralized selector management
- Reusable action methods
- Easier maintenance when UI changes
- Self-documenting test code
- Type-safe with JSDoc comments

Example usage shown in `keyboard-navigation-pom-example.spec.js`

### 5. **Enhanced npm Scripts**
New commands:
- `npm run test:a11y` - Run only accessibility tests
- `npm run test:keyboard` - Run keyboard navigation tests
- `npm run test:smoke` - Run critical path tests
- `npm run test:slow` - Run with slow motion for debugging
- `npm run test:trace` - Generate trace files for debugging
- `npm run test:reporter-line` - Concise output for CI

## Key Learning Points

### 1. **Wait Strategies**
```javascript
// ❌ Anti-pattern: Fixed timeouts
await page.waitForTimeout(500);

// ✅ Best practice: Wait for specific conditions
await expect(element).toBeVisible();
await expect(element).toBeFocused();
await expect(element).toContainText('Expected text');
await page.waitForLoadState('networkidle');
```

### 2. **Assertion Timeouts**
```javascript
// Default timeout (5s from config)
await expect(element).toBeVisible();

// Custom timeout when needed
await expect(element).toBeVisible({ timeout: 10000 });

// With helpful error message
await expect(element).toBeVisible({ 
  timeout: 3000,
  message: 'Login button should appear after form submission' 
});
```

### 3. **Dynamic Conditions**
```javascript
// Use expect.poll() for complex conditions
await expect.poll(
  async () => {
    const text = await page.locator('[aria-live]').textContent();
    return text.includes('Grabbed');
  },
  {
    timeout: 3000,
    message: 'Expected "Grabbed" announcement'
  }
).toBeTruthy();
```

### 4. **Test Organization**
```javascript
test.describe('Feature Area @tag', () => {
  test('specific behavior @smoke', async ({ page }) => {
    await test.step('Setup', async () => {
      // Preparation
    });
    
    await test.step('Action', async () => {
      // User interaction
    });
    
    await test.step('Verification', async () => {
      // Assertions
    });
  });
});
```

### 5. **Debugging Tips**
- Use `--debug` flag to step through tests
- Use `--ui` flag for interactive debugging
- Add `await page.pause()` to pause execution
- Use `console.log(await page.locator('body').innerHTML())` to see current DOM
- Enable trace on failure for post-mortem debugging
- Use `SLOW_MO=100 npm run test:headed` to slow down actions

### 6. **Common Pitfalls to Avoid**
1. Don't use `page.$()` - use `page.locator()` instead
2. Don't chain locator methods unnecessarily
3. Don't forget to await async operations
4. Don't use CSS selectors for text - use role selectors for a11y
5. Don't ignore flaky tests - fix the root cause

### 7. **Accessibility Testing**
- Always include `?ea` query parameter to enable accessibility
- Use role-based selectors when possible
- Verify ARIA announcements for screen reader users
- Test keyboard navigation thoroughly
- Check focus order matches visual layout

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm run test:keyboard

# Debug a failing test
npm run test:debug -- --grep "should grab and drop"

# Run with trace for debugging
npm run test:trace

# Update snapshots
npm run test:update-snapshots

# Run tests in slow motion
npm run test:slow
```

## Next Steps

1. Consider adding visual regression testing with screenshots
2. Add API mocking for more reliable tests
3. Implement test data factories for complex scenarios
4. Add performance testing with Playwright's performance APIs
5. Set up CI/CD integration with proper reporting

Remember: **Fast, reliable tests > Many flaky tests**