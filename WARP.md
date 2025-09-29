# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **Backend Developer Portfolio** built with **Astro.js v5.14.1**, **TailwindCSS v4.1.13**, and **TypeScript 5.9.2**. The project features a dark theme design showcasing backend development services, skills, projects, and contact information with **comprehensive testing infrastructure** using Vitest and Playwright.

## Key Architecture

### Technology Stack

- **Framework**: Astro.js v5.14.1 (Static Site Generator)
- **Styling**: TailwindCSS v4.1.13 with modular CSS architecture
- **TypeScript**: v5.9.2 - Strict mode enabled with Astro's recommended config
- **Testing**: Vitest (unit/integration) + Playwright (E2E) with coverage reporting
- **Code Quality**: ESLint v9.36.0 + Prettier v3.6.2 with Astro plugins
- **Package Manager**: Bun (preferred) or npm (fallback)
- **Build Tool**: Vite (integrated with Astro)

### Project Structure

```
/
├── src/
│   ├── components/        # 22 Astro components (.astro files)
│   │   ├── sections/      # Page sections (About, Skills, Projects, etc.)
│   │   ├── ui/           # Reusable UI components (Button, Card, Badge)
│   │   └── layouts/      # Layout components (Header, Footer)
│   ├── config/           # Configuration files (index.ts)
│   ├── content/          # Content collections (projects, services)
│   │   ├── projects/     # Project markdown files
│   │   └── services/     # Service definitions
│   ├── data/             # Site configuration (site.ts)
│   ├── layouts/          # Page layouts (Layout.astro)
│   ├── pages/            # Route pages (index.astro, 404.astro, etc.)
│   │   └── projects/     # Dynamic project pages
│   ├── styles/           # Modular CSS system (2,816 total lines)
│   │   ├── main.css      # Entry point (373 lines)
│   │   ├── variables.css # Design tokens (126 lines)
│   │   ├── base.css      # Reset & base styles (230 lines)
│   │   ├── components.css# Component styles (1,076 lines)
│   │   ├── animations.css# Performance-optimized animations (433 lines)
│   │   └── utilities.css # Utility classes (578 lines)
│   ├── test/             # Component and integration tests
│   └── utils/            # Utility functions (pagination, projects, services)
├── tests/                # Test suite (4 test files)
├── public/               # Static assets
├── dist/                 # Build output
├── .astro/              # Generated types
└── docs/                 # Additional documentation
```

### CSS Architecture

The project uses a **modular CSS architecture** with **2,816 total lines** across 6 specialized files:

- **Comprehensive modular system** with dedicated files for components, utilities, animations
- **Design system** with CSS custom properties for consistent theming (126 lines of variables)
- **Component-focused architecture** (1,076 lines) with BEM-inspired naming
- **Performance-first animations** (433 lines) using CSS-only transforms and Intersection Observer
- **Extensive utility system** (578 lines) for rapid development

### Component System

**22 reusable components** following composition-over-configuration principle:

- **UI Components**: Button, Card, Badge, SectionHeader, and more
- **Layout Components**: Header, Footer, ScrollReveal
- **Specialized Components**: Logo, Navigation, MobileMenu, SkillCard, ProjectCard, PricingCard
- **Page Sections**: About, Skills, Projects, Pricing, Contact
- **Content Management**: Dynamic project pages with markdown content collections

## Essential Commands

### Development Setup

```bash
# Install dependencies (takes ~45-60 seconds, NEVER CANCEL)
bun install

# Install dependencies Fallback
npm install

# Start development server with hot reload (runs at http://localhost:4321)
bun run dev

# Start fallback development server with hot reload (runs at http://localhost:4321)
npm run dev

# Verify Astro installation
bun run astro -- --version

# Verify astro installation fallback
npm run astro -- --version
```

### Build & Preview

```bash
# Build for production with type checking (extremely fast ~3-5 seconds)
bun run build

# Build for production fallback
npm run build

# Preview production build locally
bun run preview

# Preview production build locally fallback
npm run preview
```

### Code Quality

```bash
# Lint code (includes .astro, .ts, .js, .md files) - ESLint 9.36.0
bun run lint

# Lint code fallback
npm run lint

# Auto-fix linting issues
bun run lint:fix

# Auto-fix linting issues fallback
npm run lint:fix

# Format code with Prettier 3.6.2
bun run format

# Format code fallback
npm run format

# Check formatting without changes
bun run format:check

# Check Astro-specific issues
bun run astro check

# Check Astro-specific issues fallback
npm run astro check
```

### Testing Commands

```bash
# Run unit and integration tests (Vitest)
bun run test

# Run unit and integration tests fallback
npm run test

# Run tests in watch mode
bun run test:watch

# Run tests with UI
bun run test:ui

# Run tests with coverage reporting
bun run test:coverage

# Run E2E tests (Playwright)
bun run test:e2e

# Run E2E tests with UI
bun run test:e2e:ui

# Run all tests (unit + E2E)
bun run test:all
```

### Astro CLI Commands

```bash
# Run any Astro CLI command
bun run astro [command]

# Run any Astro CLI command fallback
npm run astro [command]

# Get help
bun run astro -- --help

# Run any Astro CLI command fallback
npm run astro -- --help

# Add integrations
bun run astro add [integration]

# Run any Astro CLI command fallback
npm run astro add [integration]
```

## Development Workflow

### Local Development

1. Run `bun install` (never cancel, takes 45-60 seconds)
2. Start dev server with `bun run dev`
3. Visit http://localhost:4321
4. Make changes with hot reload enabled

### Making Changes

- **Components**: Edit `.astro` files in `src/components/`
- **Styles**: Global changes in `src/styles/`, component styles in `.astro` files
- **Content**: Update text directly in component files
- **Assets**: Add to `public/` directory, reference with `/filename.ext`

### Testing Changes

**Automated Testing** (4 test files covering critical functionality):

```bash
bun run test        # Unit/integration tests with Vitest
bun run test:e2e    # End-to-end tests with Playwright
bun run test:all    # Complete test suite
```

**Manual Validation** scenarios:

1. **Homepage loading** - verify dark theme and all sections visible
2. **Navigation** - test smooth scrolling and mobile menu
3. **Interactive elements** - contact form, buttons, animations
4. **Responsiveness** - test on different screen sizes
5. **Project pages** - dynamic routing and content collections
6. **Content management** - markdown rendering and metadata

### Build Validation

```bash
# Complete validation sequence
bun run lint           # ESLint validation
bun run format:check   # Prettier validation
bun run test           # Unit/integration tests
bun run test:e2e       # End-to-end tests
bun run build          # Production build (includes type checking)
bun run preview        # Test production build
```

## Architecture Details

### Component Props Pattern

Components follow consistent prop interfaces:

- `variant` for style variations ('primary', 'secondary', 'ghost')
- `size` for sizing options ('sm', 'md', 'lg')
- `class` for additional CSS classes
- Boolean flags for features (`fullWidth`, `disabled`, `popular`)

### CSS Design System

- **Colors**: Primary (#2a8fff), Secondary (#22b07e), Background (#05060a)
- **Spacing Scale**: 4px-based (xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px)
- **Typography Scale**: 12px to 36px with consistent line heights
- **Animations**: Hardware-accelerated, respects `prefers-reduced-motion`

### Performance Optimizations

- **Static Site Generation** with Astro 5.14.1 for extremely fast builds
- **CSS-only animations** (433 lines) using Intersection Observer
- **Modular CSS architecture** (2,816 lines across 6 files) for optimized loading
- **Content Collections** for efficient content management
- **Image optimization** and lazy loading ready
- **Critical CSS** with base styles (230 lines) loading first
- **Build-time type checking** integrated into production builds

## Important Notes

### Environment Requirements

- **Node.js 18+** (required by Astro v5.14.1)
- **Package Manager**: Bun preferred (bun.lock present), npm works perfectly
- **Testing**: Vitest 3.2.4+ for unit tests, Playwright 1.55.1+ for E2E tests

### Critical Reminders

- ⏰ **NEVER CANCEL** npm install (takes 45-60s, must complete)
- 🧪 **RUN TESTS FIRST** - Use automated test suite before manual validation
- 🔍 **Build and preview** before considering work complete
- 🏗️ **Validate with browser testing** - functionality over assumptions
- 📝 **Content collections** - Use markdown files in `src/content/` for new projects/services

### Performance Expectations

- **Build time**: 3-5 seconds (extremely fast)
- **Dev server start**: 2-5 seconds
- **Install time**: 45-60 seconds
- **Type checking**: 5-10 seconds (with optional deps)

### Accessibility Features

- **WCAG 2.1 AA compliant** with skip links, ARIA labels, keyboard navigation
- **Screen reader compatible** with semantic HTML
- **Reduced motion support** built into animations
- **Color contrast** meets accessibility standards

## Troubleshooting

### Common Issues

- **Port 4321 in use**: Kill other processes or use `--port` flag
- **Hot reload not working**: Restart dev server
- **TypeScript errors**: Run `bun run astro check` (install deps first)
- **Build errors**: Check file paths relative to `src/`
- **Styles not updating**: Verify CSS syntax in global.css or components

### Build Validation Before Deployment

```bash
bun run lint           # ESLint validation
bun run format:check   # Code formatting validation
bun run test           # Unit and integration tests
bun run test:e2e       # End-to-end tests
bun run build          # Production build (includes Astro check)
# Manual test critical user scenarios
```

## Recent Updates

### Latest Changes (September 2024)

- **Astro upgraded** to v5.14.1 with enhanced performance
- **Comprehensive testing infrastructure** added with Vitest and Playwright
- **Content collections** implemented for dynamic project management
- **Enhanced build pipeline** with integrated type checking
- **Code quality tools** upgraded (ESLint 9.36.0, Prettier 3.6.2)
- **Extended component library** now includes 22 specialized components
- **CSS architecture expanded** to 2,816 lines across 6 modular files

This is a **production-ready, fully tested** static site with comprehensive testing infrastructure, mature component system, and content management capabilities. The modular architecture supports rapid development while maintaining consistency, performance, and reliability through automated testing.
