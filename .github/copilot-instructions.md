# Backend Developer Portfolio

**ALWAYS FOLLOW THESE INSTRUCTIONS FIRST.** Only search for additional context or run exploratory commands if the information here is incomplete or incorrect.

Personal portfolio website built with Astro.js v5.13.5, TailwindCSS v4.1.13, and TypeScript. Features a dark theme design showcasing backend development services, skills, projects, and contact information.

## Working Effectively

### Bootstrap and Setup

Run these commands in sequence to set up the development environment:

```bash
# Install dependencies (takes ~45-60 seconds)
npm install

# Verify installation worked
npm run astro -- --version
```

**NEVER CANCEL** the npm install - it takes 45-60 seconds and must complete fully.

### Build Process

```bash
# Build for production (takes ~3-5 seconds - very fast!)
npm run build
# Set timeout to 30+ seconds minimum, but build typically completes in under 5 seconds
```

The build is extremely fast due to Astro's static site generation. Output goes to `./dist/` directory.

### Development Server

```bash
# Start development server with hot reload
npm run dev
# Server starts at http://localhost:4321/
# NEVER CANCEL - let it run, takes ~2-5 seconds to start
```

The dev server includes:

- Hot module replacement
- Vite integration for fast builds
- TypeScript checking
- TailwindCSS processing

### Preview Built Site

```bash
# Preview production build locally
npm run preview
# Serves from dist/ at http://localhost:4321/
# Takes ~2-3 seconds to start
```

### Type Checking and Validation

```bash
# Check for TypeScript errors (requires additional dependency)
npm install --save-dev @astrojs/check typescript
npm run astro check
# Takes ~5-10 seconds, validates all .astro and .ts files
```

**Note**: `astro check` requires manual dependency installation as shown above.

## Validation Requirements

**MANUAL VALIDATION REQUIREMENT**: After making changes, you MUST test actual functionality by running through these scenarios:

### Complete User Scenarios

1. **Homepage Loading**:
   - Visit http://localhost:4321/
   - Verify dark theme loads correctly
   - Check all sections are visible: About, Skills, Projects, Pricing, Contact

2. **Navigation Testing**:
   - Test smooth scrolling between sections
   - Verify all navigation links work (About, Skills, Projects, Pricing, Contact)
   - Check mobile menu functionality if applicable

3. **Interactive Elements**:
   - Test contact form inputs (Name, Email, Subject, Message fields)
   - Verify buttons have proper hover states
   - Check skill progress bars display correctly
   - Test project cards and their links

4. **Visual Validation**:
   - Verify dark theme CSS variables are applied
   - Check gradient effects and animations work
   - Ensure responsive design works on different screen sizes
   - Validate custom fonts and typography

### Build Validation Steps

Always run these after making changes:

```bash
# 1. Clean build to catch any issues
npm run build

# 2. Test dev server functionality
npm run dev
# Navigate to http://localhost:4321/ and test scenarios above

# 3. Test production preview
npm run preview
# Verify built site works identically to dev version

# 4. Optional: Type checking (if dependencies installed)
npm run astro check
```

## Environment Requirements

### Package Manager

- **Preferred**: Bun (as indicated by bun.lock file)
- **Fallback**: npm (works perfectly, generates package-lock.json)
- **Do NOT use**: yarn (not configured)

### Node.js Version

- Compatible with Node.js 18+ (required by Astro v5.13.5)
- Use `node --version` to verify

### Dependencies

**Core dependencies** (automatically installed):

- `astro` v5.13.5 - Static site generator
- `@tailwindcss/vite` v4.1.13 - Vite integration for TailwindCSS
- `tailwindcss` v4.1.13 - Utility-first CSS framework

**Optional dependencies** (install manually when needed):

```bash
npm install --save-dev @astrojs/check typescript
```

## Repository Structure and Navigation

### Key Directories

```
/
├── src/                    # Source code
│   ├── components/         # Astro components (.astro files)
│   ├── layouts/           # Page layouts
│   ├── pages/             # Route pages (index.astro)
│   └── styles/            # Global CSS (global.css)
├── public/                # Static assets (images, favicon)
├── .astro/                # Generated types (auto-created)
├── dist/                  # Build output (created by npm run build)
└── node_modules/          # Dependencies
```

### Important Files

- **`src/pages/index.astro`** - Main homepage with all sections
- **`src/layouts/Layout.astro`** - Base layout with header, footer, and global styles
- **`src/styles/global.css`** - Extensive dark theme customizations with CSS variables
- **`astro.config.mjs`** - Astro configuration with TailwindCSS integration
- **`package.json`** - Project dependencies and scripts
- **`tsconfig.json`** - TypeScript configuration

### Component Structure

All components are in `src/components/`:

- `Header.astro` - Navigation and branding
- `Footer.astro` - Footer with links and social media
- `About.astro` - About section with skills highlights
- `Skills.astro` - Technical skills with progress bars
- `Projects.astro` - Featured projects showcase
- `Pricing.astro` - Service pricing tiers
- `Contact.astro` - Contact form and information
- `ScrollAnimations.astro` - JavaScript for smooth scrolling

## Common Development Tasks

### Adding New Components

1. Create `.astro` file in `src/components/`
2. Import and use in `src/pages/index.astro` or `src/layouts/Layout.astro`
3. Test with `npm run dev`

### Styling Changes

- **Global styles**: Edit `src/styles/global.css`
- **Component styles**: Add `<style>` section in `.astro` files
- **Utility classes**: Use TailwindCSS classes directly in components

### Content Updates

- **Text content**: Edit content directly in `.astro` component files
- **Images**: Add to `public/` directory and reference with `/filename.ext`
- **Metadata**: Update `src/layouts/Layout.astro` for title, meta tags

### Performance Optimization

```bash
# Build and check size
npm run build
ls -la dist/

# Check for unused CSS (TailwindCSS automatically purges)
# Check for large assets in public/ directory
```

## Troubleshooting Common Issues

### Build Errors

- **TypeScript errors**: Run `npm run astro check` (after installing dependencies)
- **Import errors**: Check file paths are relative to src/
- **CSS errors**: Verify TailwindCSS classes are valid

### Dev Server Issues

- **Port 4321 in use**: Kill other processes or use `--port` flag
- **Hot reload not working**: Restart dev server
- **Styles not updating**: Check global.css syntax

### Deployment Preparation

```bash
# Final validation before deployment
npm run build
npm run preview
# Test all user scenarios manually
```

## CI/CD Considerations

This project has no CI/CD pipeline configured. For production deployment:

1. **Build command**: `npm run build`
2. **Output directory**: `dist/`
3. **Node version**: 18+ required
4. **Build time**: ~3-5 seconds (very fast)
5. **No tests**: No test suite configured

## Quick Reference Commands

| Command                   | Purpose              | Time    | Notes               |
| ------------------------- | -------------------- | ------- | ------------------- |
| `npm install`             | Install dependencies | ~45-60s | NEVER CANCEL        |
| `npm run build`           | Production build     | ~3-5s   | Output to dist/     |
| `npm run dev`             | Dev server           | ~2-5s   | Hot reload enabled  |
| `npm run preview`         | Preview build        | ~2-3s   | Serves from dist/   |
| `npm run astro check`     | Type checking        | ~5-10s  | Requires extra deps |
| `npm run astro -- --help` | Show Astro commands  | instant | Reference           |

**CRITICAL REMINDERS**:

- ⏰ **NEVER CANCEL** any running command - let it complete naturally
- 🧪 **ALWAYS test user scenarios** manually after changes
- 🔍 **Build and preview** before considering work complete
- 🏗️ **Validate with actual browser testing** - functionality over assumptions
