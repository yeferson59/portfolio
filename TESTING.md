# Testing Guide

This project includes comprehensive testing infrastructure for both unit tests and end-to-end (E2E) tests using Vitest and Playwright respectively.

## Test Structure

```
portfolio/
├── src/
│   └── test/
│       ├── setup.ts                    # Test setup configuration
│       ├── components/                 # Unit tests for UI components
│       │   ├── Badge.test.ts
│       │   ├── Button.test.ts
│       │   ├── Card.test.ts
│       │   └── SectionHeader.test.ts
│       └── integration/                # Integration tests
│           └── sections.test.ts
├── tests/                              # End-to-end tests
│   ├── example.spec.ts                 # Main page functionality
│   ├── accessibility-performance.spec.ts # Accessibility and performance
│   ├── seo-metadata.spec.ts           # SEO and metadata validation
│   └── basic.spec.ts                   # Basic validation (skipped)
├── vitest.config.ts                    # Vitest configuration
└── playwright.config.ts               # Playwright configuration
```

## Available Test Commands

| Command                | Description                                    |
| ---------------------- | ---------------------------------------------- |
| `npm run test`         | Run all unit and integration tests            |
| `npm run test:watch`   | Run tests in watch mode                       |
| `npm run test:ui`      | Open Vitest UI for interactive testing        |
| `npm run test:e2e`     | Run end-to-end tests                          |
| `npm run test:e2e:ui`  | Run E2E tests with Playwright UI              |
| `npm run test:all`     | Run all tests (unit + integration + E2E)      |

## Unit Testing with Vitest

### Overview
Unit tests use Vitest with Astro's Container API to test individual components in isolation. The Container API allows rendering Astro components to strings for testing without a browser environment.

### Configuration
- **Framework**: Vitest with happy-dom environment
- **Location**: `src/test/`
- **Pattern**: `**/*.{test,spec}.{js,ts}`
- **Setup**: `src/test/setup.ts` for global test configuration

### Writing Unit Tests

#### Testing UI Components
```typescript
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test, describe } from "vitest";
import Button from "../../components/ui/Button.astro";

describe("Button Component", () => {
  test("renders basic button with default props", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Button, {
      slots: {
        default: "Click me",
      },
    });

    expect(result).toContain("Click me");
    expect(result).toContain('class="btn btn--primary btn--md"');
    expect(result).toContain("<button");
  });
});
```

#### Testing with Props
```typescript
test("renders secondary variant button", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Button, {
    props: {
      variant: "secondary",
      href: "https://example.com",
    },
    slots: {
      default: "Link Button",
    },
  });

  expect(result).toContain("btn--secondary");
  expect(result).toContain('<a');
  expect(result).toContain('href="https://example.com"');
});
```

### Current Unit Tests

#### Components Tested
- **Button**: All variants, states, and prop combinations
- **Card**: Different variants and hover states
- **Badge**: All color variants and custom classes
- **SectionHeader**: Title/subtitle combinations

#### Integration Tests
- **Page Sections**: About, Skills, Contact sections
- **Content Validation**: Ensures sections render with expected content
- **Form Elements**: Validates contact form structure

### Running Unit Tests
```bash
# Run all tests once
npm run test

# Watch mode for development
npm run test:watch

# Interactive UI
npm run test:ui
```

## End-to-End Testing with Playwright

### Overview
E2E tests use Playwright to test the complete user experience across different browsers and viewports. Tests cover functionality, accessibility, performance, and SEO.

### Configuration
- **Browsers**: Chromium, Firefox, WebKit
- **Base URL**: `http://localhost:4321`
- **Auto-server**: Automatically starts preview server
- **Reports**: HTML reports generated

### Test Categories

#### 1. Homepage Functionality (`example.spec.ts`)
- Page loading and title verification
- Navigation functionality
- Contact form interaction
- Responsive design across viewports
- Mobile menu functionality

#### 2. Accessibility (`accessibility-performance.spec.ts`)
- Heading hierarchy validation
- Image alt text verification
- Link accessibility
- Form label associations
- Focus management
- Performance metrics
- Console error detection

#### 3. SEO and Metadata (`seo-metadata.spec.ts`)
- Meta tag validation (title, description)
- Open Graph tags
- Twitter Card metadata
- Structured data (JSON-LD)
- Language attributes
- Favicon verification
- Canonical URLs
- Robots meta tags

### Example E2E Test
```typescript
import { test, expect } from '@playwright/test';

test.describe('Portfolio Homepage', () => {
  test('has correct title and loads main sections', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/Backend Developer Portfolio/);
    
    // Check main sections are visible
    await expect(page.getByText('About')).toBeVisible();
    await expect(page.getByText('Skills')).toBeVisible();
    await expect(page.getByText('Projects')).toBeVisible();
  });
});
```

### Running E2E Tests

#### Prerequisites
First install Playwright browsers:
```bash
npx playwright install
```

#### Running Tests
```bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode
npm run test:e2e:ui

# Run specific test file
npx playwright test example.spec.ts

# Run in headed mode (visible browser)
npx playwright test --headed

# Generate test report
npx playwright show-report
```

### Browser Support
- **Chromium**: Desktop Chrome/Edge testing
- **Firefox**: Mozilla Firefox testing  
- **WebKit**: Safari testing
- **Mobile**: Optional mobile viewport testing

## Best Practices

### Unit Testing
1. **Test Behavior, Not Implementation**: Focus on component output and user-visible behavior
2. **Use Descriptive Test Names**: Clearly describe what the test validates
3. **Test Edge Cases**: Include tests for disabled states, empty content, error conditions
4. **Mock External Dependencies**: Use mocks for API calls or external services
5. **Keep Tests Isolated**: Each test should be independent and not rely on others

### E2E Testing
1. **Test User Workflows**: Focus on complete user journeys
2. **Use Page Object Model**: Create reusable page objects for complex interactions
3. **Test Across Browsers**: Ensure compatibility across different browsers
4. **Include Accessibility**: Always test for accessibility compliance
5. **Performance Testing**: Monitor page load times and resource usage
6. **Mobile First**: Test responsive design and mobile interactions

### General Guidelines
1. **Maintain Test Coverage**: Aim for good coverage of critical functionality
2. **Keep Tests Fast**: Optimize test execution time
3. **Regular Maintenance**: Update tests when components change
4. **Documentation**: Document complex test scenarios
5. **CI/CD Integration**: Ensure tests run in continuous integration

## Troubleshooting

### Common Issues

#### Vitest Configuration
If you encounter TypeScript errors with the Vitest config, ensure it's excluded from Astro's type checking:
```json
// tsconfig.json
{
  "exclude": ["dist", "vitest.config.ts"]
}
```

#### Playwright Browser Installation
If browser installation fails:
```bash
# Install specific browser
npx playwright install chromium

# Install with dependencies
npx playwright install --with-deps chromium

# Check installation
npx playwright --version
```

#### Port Conflicts
If port 4321 is in use:
```bash
# Kill process using port
lsof -ti:4321 | xargs kill

# Or modify playwright.config.ts to use different port
```

#### Container API Issues
Ensure you're using the correct import:
```typescript
import { experimental_AstroContainer as AstroContainer } from "astro/container";
```

### Test Failures
1. **Check Browser Compatibility**: Some features may not work in all browsers
2. **Timing Issues**: Add appropriate waits for async operations
3. **Selector Changes**: Update selectors if component markup changes
4. **Environment Differences**: Ensure tests work in both local and CI environments

## Extending Tests

### Adding New Component Tests
1. Create test file in `src/test/components/`
2. Import component and AstroContainer
3. Write tests for all props and variants
4. Include edge cases and error states

### Adding New E2E Tests
1. Create test file in `tests/` directory
2. Use descriptive test suite names
3. Include setup and teardown as needed
4. Test both happy path and error scenarios

### Custom Test Utilities
Create helper functions in `src/test/utils/` for:
- Common test data
- Reusable assertions
- Mock functions
- Test fixtures

## Performance Considerations

### Unit Tests
- Use Container API for isolated component testing
- Avoid unnecessary DOM manipulation
- Mock heavy dependencies
- Run tests in parallel when possible

### E2E Tests
- Use `page.waitForLoadState()` for better reliability
- Implement proper wait strategies
- Take screenshots on failure for debugging
- Use `test.slow()` for long-running tests

## Security Testing

While not fully implemented, consider adding:
- Input validation testing
- XSS protection verification
- CSRF token validation
- Content Security Policy testing
- Authentication/authorization tests

## Continuous Integration

Tests are configured to run in CI/CD pipelines:
- Unit tests run on every pull request
- E2E tests run on main branch changes
- Test reports are generated and stored
- Failed tests prevent deployment

For questions or issues with testing, refer to:
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Astro Container API](https://docs.astro.build/en/reference/container-reference/)