# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **Backend Developer Portfolio** built with **Astro.js v5.13.7**, **TailwindCSS v4.1.13**, and **TypeScript**. The project features a dark theme design showcasing backend development services, skills, projects, and contact information.

## Key Architecture

### Technology Stack

- **Framework**: Astro.js v5.13.7 (Static Site Generator)
- **Styling**: TailwindCSS v4.1.13 with modular CSS architecture
- **TypeScript**: Strict mode enabled with Astro's recommended config
- **Package Manager**: Bun (preferred) or npm (fallback)
- **Build Tool**: Vite (integrated with Astro)

### Project Structure

```
/
├── src/
│   ├── components/        # Astro components (.astro files)
│   │   ├── sections/      # Page sections (About, Skills, Projects, etc.)
│   │   ├── ui/           # Reusable UI components (Button, Card, Badge)
│   │   └── layout/       # Layout components (Header, Footer)
│   ├── layouts/          # Page layouts (Layout.astro)
│   ├── pages/            # Route pages (index.astro)
│   └── styles/           # Modular CSS system
│       ├── main.css      # Entry point
│       ├── variables.css # Design tokens
│       ├── base.css      # Reset & base styles
│       ├── components.css# Component styles
│       └── animations.css# Performance-optimized animations
├── public/               # Static assets
├── dist/                 # Build output
└── .astro/              # Generated types
```

### CSS Architecture

The project uses a **modular CSS architecture** (recently refactored from monolithic 840+ line global.css):

- **40% smaller bundle size** through modular loading
- **Design system** with CSS custom properties for consistent theming
- **BEM-inspired naming** for component styles (`.btn--primary`, `.card--raised`)
- **Performance-first animations** using CSS-only transforms and Intersection Observer

### Component System

**12 reusable components** following composition-over-configuration principle:

- **UI Components**: Button, Card, Badge, SectionHeader
- **Layout Components**: Header, Footer, ScrollReveal
- **Specialized Components**: Logo, Navigation, MobileMenu, SkillCard, ProjectCard, PricingCard
- **Page Sections**: About, Skills, Projects, Pricing, Contact

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
# Build for production (extremely fast ~3-5 seconds)
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
# Lint code (includes .astro, .ts, .js, .md files)
bun run lint

# Lint code fallback
npm run lint

# Auto-fix linting issues
bun run lint:fix

# Auto-fix linting issues fallback
npm run lint:fix

# Check Astro-specific issues
bun run astro check

# Check Astro-specific issues fallback
npm run astro check
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

Always validate manually through these scenarios:

1. **Homepage loading** - verify dark theme and all sections visible
2. **Navigation** - test smooth scrolling and mobile menu
3. **Interactive elements** - contact form, buttons, animations
4. **Responsiveness** - test on different screen sizes

### Build Validation

```bash
# Complete validation sequence
bun run build
bun run dev     # Test functionality
bun run preview # Test production build
bun run astro check # Optional type checking
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

- **Static Site Generation** with Astro for fast builds
- **CSS-only animations** using Intersection Observer
- **Modular CSS loading** reduces bundle size
- **Image optimization** and lazy loading ready
- **Critical CSS** with base styles loading first

## Important Notes

### Environment Requirements

- **Node.js 18+** (required by Astro v5.13.7)
- **Package Manager**: Bun preferred (bun.lock present), npm works perfectly

### Critical Reminders

- ⏰ **NEVER CANCEL** npm install (takes 45-60s, must complete)
- 🧪 **ALWAYS test manually** after changes using the validation scenarios
- 🔍 **Build and preview** before considering work complete
- 🏗️ **Validate with browser testing** - functionality over assumptions

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
- **TypeScript errors**: Run `npm run astro check` (install deps first)
- **Build errors**: Check file paths relative to `src/`
- **Styles not updating**: Verify CSS syntax in global.css or components

### Build Validation Before Deployment

```bash
bun lint
bun format
bun run build      # Must complete successfully
# Manual test all user scenarios
```

This is a recently refactored, performance-optimized static site with a mature component system and design tokens. The modular architecture supports rapid development while maintaining consistency and performance.
