# Preview Command Fix - Technical Summary

## Problem

The `@astrojs/vercel` adapter does not support the `astro preview` command, which was causing failures in:
- GitHub Actions CI/CD pipeline (Playwright tests)
- Local development workflow when developers try to preview the production build

## Root Cause

When using an Astro adapter like `@astrojs/vercel`, the built-in `astro preview` command is disabled because adapters take control of the build output structure and deployment process. This is by design, as each adapter generates platform-specific output that requires specialized serving methods.

## Solution Overview

The project uses a hybrid approach:
1. **Build with Vercel adapter**: Maintain compatibility with Vercel deployment
2. **Explicit prerendering**: Mark static pages with `export const prerender = true`
3. **Custom preview command**: Use `http-server` to serve the static files from `.vercel/output/static/`

## Changes Made

### 1. Configuration Updates

**astro.config.mjs**
- Changed `output` from `"static"` to `"server"` mode
- Kept Vercel adapter for deployment compatibility
- All static pages are explicitly prerendered

### 2. Page Modifications

Added `export const prerender = true` to all static pages:
- `src/pages/index.astro`
- `src/pages/404.astro`
- `src/pages/api-explorer.astro`
- `src/pages/projects.astro`
- `src/pages/projects/[page].astro`

Dynamic endpoints remain server-rendered:
- `src/pages/api/mcp.ts` - keeps `export const prerender = false`
- `src/pages/sitemap.xml.ts` - server-rendered for dynamic content

### 3. Preview Command Update

**package.json**
```json
{
  "scripts": {
    "preview": "http-server .vercel/output/static -p 4321 -s"
  }
}
```

**Dependencies**
- Added `http-server` as dev dependency

**playwright.config.ts**
```typescript
webServer: {
  command: 'npx http-server .vercel/output/static -p 4321 -s',
  // ... other config
}
```

### 4. Build Output Changes

- **Before**: Output to `./dist/` (standard Astro build)
- **After**: Output to `./.vercel/output/` (Vercel adapter structure)
  - Static files: `.vercel/output/static/`
  - Server functions: `.vercel/output/_functions/`

### 5. Documentation Updates

Updated the following files:
- `README.md` - Added preview command explanation
- `.github/copilot-instructions.md` - Updated build output paths and architecture notes
- `.gitignore` - Added `.vercel/` to ignore build artifacts

## Benefits

1. ✅ **Preview command works**: Developers can run `npm run preview` locally
2. ✅ **Playwright tests work**: E2E tests can run in CI/CD
3. ✅ **Vercel deployment works**: Static files are properly generated
4. ✅ **API endpoints work**: Server-rendered endpoints still function
5. ✅ **Fast builds**: Static pages are pre-rendered at build time

## Testing

All validation passed:
- ✅ Build process completes successfully
- ✅ All static pages are pre-rendered
- ✅ Preview server serves pages correctly
- ✅ Linting passes
- ✅ Formatting passes
- ✅ Type checking passes

## Deployment Notes

For Vercel deployment:
- Let Vercel auto-detect the build output (it recognizes `.vercel/output/` structure)
- Or explicitly set output directory to `.vercel/output/static/` if needed
- The Vercel adapter automatically configures serverless functions for dynamic endpoints

## Alternative Solutions Considered

1. **Remove Vercel adapter entirely**: Would lose web analytics and serverless function support
2. **Use only static output**: Would lose the ability to have server-rendered API endpoints
3. **Different preview server**: http-server was chosen for simplicity and reliability

## Future Considerations

- Monitor Astro updates for native preview support with adapters
- Consider adding more server-rendered features if needed
- Evaluate performance impact of hybrid rendering vs pure static

---

**Issue Reference**: [WebServer] Preview Command Not Supported
**Date**: 2024-10-09
**Status**: ✅ Resolved
