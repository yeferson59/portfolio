# Backend Developer Portfolio

**ALWAYS FOLLOW THESE INSTRUCTIONS FIRST.** Only search for additional context or run exploratory commands if the information here is incomplete or incorrect.

Personal portfolio website built with Astro.js v5.14.1, TailwindCSS v4.1.13, and TypeScript 5.9.2. Features a dark theme design showcasing backend development services, skills, projects, and contact information with a modern, responsive layout.

### Architecture Notes

- **Output mode**: `server` with Vercel adapter for hybrid rendering
- **Dynamic endpoints**: API endpoints like `/api/mcp` are server-rendered
- **Preview command**: Uses `http-server` instead of `astro preview` (Vercel adapter doesn't support it)
- **Build output**: `.vercel/output/` directory structure for Vercel deployment

### Warning

Using bun when it's available and using npm when it's not.

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

The build is extremely fast due to Astro's static site generation. Output goes to `./.vercel/output/` directory (static files in `.vercel/output/static/`).

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
- ESLint integration for code quality

### Preview Built Site

```bash
# Preview production build locally
npm run preview
# Serves from .vercel/output/static/ at http://localhost:4321/
# Uses http-server (Vercel adapter doesn't support astro preview)
# Takes ~2-3 seconds to start
```

### Type Checking and Validation

```bash
# Check for TypeScript errors (dependencies already included)
npm run astro check
# Takes ~5-10 seconds, validates all .astro and .ts files
```

### Code Quality

```bash
# Lint and fix code
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

## Validation Requirements

**MANUAL VALIDATION REQUIREMENT**: After making changes, you MUST test actual functionality by running through these scenarios:

### Complete User Scenarios

1. **Homepage Loading**:
   - Visit http://localhost:4321/
   - Verify dark theme loads correctly
   - Check all sections are visible: About, Skills, Metrics, Projects, Services, Contact

2. **Navigation Testing**:
   - Test smooth scrolling between sections
   - Verify all navigation links work (About, Skills, Metrics, Projects, Services, Contact)
   - Check mobile menu functionality (hamburger menu on mobile)

3. **Interactive Elements**:
   - Test contact form inputs (Name, Email, Subject, Message fields)
   - Verify buttons have proper hover states
   - Check skill progress bars display correctly
   - Test project cards and their links
   - Verify mobile menu opens/closes properly

4. **Visual Validation**:
   - Verify dark theme CSS variables are applied
   - Check gradient effects and animations work
   - Ensure responsive design works on different screen sizes
   - Validate custom fonts and typography
   - Test accessibility features (skip links, focus states)

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

# 4. Code quality checks
npm run lint
npm run format:check
npm run astro check
```

## Environment Requirements

### Package Manager

- **Preferred**: Bun (as indicated by bun.lock file)
- **Fallback**: npm (works perfectly, generates package-lock.json)
- **Do NOT use**: yarn (not configured)

### Node.js Version

- Compatible with Node.js 18+ (required by Astro v5.14.0)
- Use `node --version` to verify

### Dependencies

**Core dependencies** (automatically installed):

- `astro` v5.14.0 - Static site generator
- `@astrojs/check` v0.9.4 - Type checking for Astro
- `@tailwindcss/vite` v4.1.13 - Vite integration for TailwindCSS
- `tailwindcss` v4.1.13 - Utility-first CSS framework
- `typescript` v5.9.2 - TypeScript compiler
- `prettier` v3.6.2 - Code formatter
- `prettier-plugin-astro` v0.14.1 - Astro formatting
- `prettier-plugin-tailwindcss` v0.6.14 - TailwindCSS class sorting

**Dev dependencies** (automatically installed):

- `eslint` v9.35.0 - Code linting
- `@eslint/js` v9.35.0 - ESLint configuration
- `eslint-plugin-astro` v1.3.1 - Astro ESLint rules
- `@typescript-eslint/parser` v8.43.0 - TypeScript ESLint parser
- `globals` v16.4.0 - Global variables for ESLint

## Repository Structure and Navigation

### Key Directories

```
portfolio/
├── src/                    # Source code
│   ├── components/         # Astro components (organized by type)
│   │   ├── layouts/        # Layout components (Header, Footer, etc.)
│   │   ├── sections/       # Page sections (About, Skills, etc.)
│   │   └── ui/             # Reusable UI components (Card, Button, etc.)
│   ├── layouts/           # Page layouts
│   ├── pages/             # Route pages (index.astro)
│   └── styles/            # Modular CSS system
│       ├── animations.css # Animation styles
│       ├── base.css       # Base/reset styles
│       ├── components.css # Component-specific styles
│       ├── main.css       # Main CSS entry point
│       ├── utilities.css  # Utility classes
│       └── variables.css  # CSS custom properties
├── public/                # Static assets (images, favicon)
├── .astro/                # Generated types (auto-created)
├── .vercel/               # Build output (created by npm run build)
│   └── output/
│       └── static/        # Static files for deployment
└── node_modules/          # Dependencies
```

### Important Files

- **`src/pages/index.astro`** - Main homepage with all sections
- **`src/layouts/Layout.astro`** - Base layout with header, footer, and global styles
- **`src/styles/main.css`** - Main CSS entry point importing all style modules
- **`src/styles/variables.css`** - CSS custom properties for theme
- **`astro.config.mjs`** - Astro configuration with TailwindCSS integration
- **`package.json`** - Project dependencies and scripts
- **`tsconfig.json`** - TypeScript configuration with path aliases
- **`eslint.config.ts`** - ESLint configuration

### Component Structure

Components are organized by type in `src/components/`:

#### Layout Components (`layouts/`)

- `Header.astro` - Navigation and branding
- `Footer.astro` - Footer with links and social media
- `Logo.astro` - Logo component
- `MobileMenu.astro` - Mobile navigation menu
- `Navigation.astro` - Desktop navigation
- `ScrollReveal.astro` - JavaScript for smooth scrolling and animations
- `SectionHeader.astro` - Reusable section headers
- `ServiceCard.astro` - Service showcase cards
- `ProjectCard.astro` - Project showcase cards
- `SkillCard.astro` - Skill progress cards

#### Section Components (`sections/`)

- `About.astro` - About section with skills highlights
- `Skills.astro` - Technical skills with progress bars
- `Projects.astro` - Featured projects showcase
- `Services.astro` - Professional services showcase
- `Contact.astro` - Contact form and information

#### UI Components (`ui/`)

- `Badge.astro` - Reusable badge component
- `Button.astro` - Button component with variants
- `Card.astro` - Card component with variants

## Common Development Tasks

### Adding New Components

1. Create `.astro` file in appropriate subfolder (`src/components/layouts/`, `sections/`, or `ui/`)
2. Import and use in `src/pages/index.astro` or `src/layouts/Layout.astro`
3. Add styles in appropriate CSS module or component `<style>` block
4. Test with `npm run dev`

### Styling Changes

- **Global styles**: Edit `src/styles/main.css` or specific modules
- **Component styles**: Add `<style>` section in `.astro` files
- **Utility classes**: Use TailwindCSS classes directly in components
- **Theme variables**: Modify `src/styles/variables.css`

### Content Updates

- **Text content**: Edit content directly in `.astro` component files
- **Images**: Add to `public/` directory and reference with `/filename.ext`
- **Metadata**: Update `src/layouts/Layout.astro` for title, meta tags

### TypeScript Configuration

- Uses strict TypeScript configuration
- Path aliases configured: `@/*` maps to `src/*`
- Import components with: `import Component from "@/components/..."`
- Auto-generated types in `.astro/types.d.ts`

## Performance Optimization

```bash
# Build and check size
npm run build
ls -la .vercel/output/static/

# Check for unused CSS (TailwindCSS automatically purges)
# Check for large assets in public/ directory

# Analyze bundle size (if needed)
npm run build && npx astro-bundle-analyzer .vercel/output/static/
```

## Troubleshooting Common Issues

### Build Errors

- **TypeScript errors**: Run `npm run astro check` and fix type issues
- **Import errors**: Check file paths are relative to src/ or use `@/` aliases
- **CSS errors**: Verify TailwindCSS classes are valid or check custom CSS syntax

### Dev Server Issues

- **Port 4321 in use**: Kill other processes or use `--port` flag
- **Hot reload not working**: Restart dev server
- **Styles not updating**: Check CSS module imports in `main.css`

### ESLint/Prettier Issues

- **Linting errors**: Run `npm run lint:fix` to auto-fix
- **Formatting issues**: Run `npm run format` to format code
- **Configuration conflicts**: Check `eslint.config.ts` and Prettier config

### Deployment Preparation

```bash
# Final validation before deployment
npm run build
npm run preview
npm run lint
npm run format:check
npm run astro check
# Test all user scenarios manually
```

## CI/CD Considerations

This project has no CI/CD pipeline configured. For production deployment:

1. **Build command**: `npm run build`
2. **Output directory**: `.vercel/output/static/` (or let Vercel auto-detect)
3. **Node version**: 18+ required
4. **Build time**: ~3-5 seconds (very fast)
5. **Code quality**: ESLint and Prettier configured
6. **Type checking**: Astro check integrated
7. **No tests**: No test suite configured

## Quick Reference Commands

| Command                   | Purpose              | Time    | Notes                     |
| ------------------------- | -------------------- | ------- | ------------------------- |
| `npm install`             | Install dependencies | ~45-60s | NEVER CANCEL              |
| `npm run build`           | Production build     | ~3-5s   | Output to .vercel/output/ |
| `npm run dev`             | Dev server           | ~2-5s   | Hot reload enabled        |
| `npm run preview`         | Preview build        | ~2-3s   | Uses http-server          |
| `npm run astro check`     | Type checking        | ~5-10s  | Integrated in build       |
| `npm run lint`            | Code linting         | ~5-10s  | Check code quality        |
| `npm run lint:fix`        | Fix linting issues   | ~5-10s  | Auto-fix problems         |
| `npm run format`          | Format code          | ~5-10s  | Prettier formatting       |
| `npm run format:check`    | Check formatting     | ~5-10s  | Verify format             |
| `npm run astro -- --help` | Show Astro commands  | instant | Reference                 |

**CRITICAL REMINDERS**:

- ⏰ **NEVER CANCEL** any running command - let it complete naturally
- 🧪 **ALWAYS test user scenarios** manually after changes
- 🔍 **Build and preview** before considering work complete
- 🏗️ **Validate with actual browser testing** - functionality over assumptions
- 📝 **Run code quality checks** (lint, format, type check) before commits
- 🎯 **Use path aliases** (`@/`) for clean imports
- 📱 **Test mobile responsiveness** and accessibility features
