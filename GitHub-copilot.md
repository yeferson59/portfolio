# Backend Developer Portfolio - GitHub Copilot Instructions

**ALWAYS FOLLOW THESE INSTRUCTIONS FIRST.** Only search for additional context or run exploratory commands if the information here is incomplete or incorrect.

Personal portfolio website built with Astro.js v5.14.0, TailwindCSS v4.1.13, and TypeScript 5.9.2. Features a dark theme design showcasing backend development services, skills, projects, and contact information with a modern, responsive layout.

## Project Overview

This is a modern, high-performance portfolio website designed to showcase backend development expertise. The site features:

- **Modern Architecture**: Built with Astro.js for optimal performance and SEO
- **Dark Theme**: Elegant design with gradients and smooth animations
- **Responsive Design**: Optimized for all device sizes
- **TypeScript**: Full type safety and better developer experience
- **Professional Sections**: About, Skills, Metrics, Projects, Services, and Contact

## Quick Start

### Installation

```bash
# Install dependencies (takes ~45-60 seconds - NEVER CANCEL)
npm install

# Verify installation
npm run astro -- --version
```

### Development

```bash
# Start development server (takes ~2-5 seconds)
npm run dev
# Server starts at http://localhost:4321/
```

### Build and Deploy

```bash
# Build for production (takes ~3-5 seconds - very fast!)
npm run build

# Preview production build
npm run preview
```

## Key Technologies

- **Astro.js 5.14.0**: Static site generator with excellent performance
- **TailwindCSS 4.1.13**: Utility-first CSS framework
- **TypeScript 5.9.2**: Static typing for robust development
- **ESLint & Prettier**: Code quality and formatting tools

## Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── layouts/        # Header, Footer, Navigation components
│   │   ├── sections/       # Page sections (About, Skills, etc.)
│   │   └── ui/             # Reusable UI components
│   ├── layouts/
│   │   └── Layout.astro    # Base layout with meta tags
│   ├── pages/
│   │   └── index.astro     # Main homepage
│   ├── data/
│   │   └── site.ts         # Site configuration and data
│   └── styles/             # CSS modules and theme
├── public/                 # Static assets
├── dist/                   # Build output (generated)
└── node_modules/           # Dependencies (generated)
```

## Portfolio Sections

### About Section

- Professional profile with avatar and bio
- Key skills highlighted as badges
- Focus on backend expertise and technical values

### Skills Section

- Technical skills with animated progress bars
- Categorized by area: Backend, Databases, DevOps, Tools
- Smooth scroll animations

### Metrics Section

- Professional achievement metrics
- Real-time performance indicators
- Data visualization components

### Projects Section

- Featured project showcases
- Repository and demo links
- Technology stack for each project

### Services Section

- Professional service offerings
- Detailed feature descriptions
- Contact call-to-action

### Contact Section

- Functional contact form with validation
- Professional contact information
- Social media and networking links

## Development Guidelines

### Package Manager

- **Preferred**: npm (generates package-lock.json)
- **Alternative**: bun (bun.lock file present)
- **Avoid**: yarn (not configured)

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code with Prettier
npm run format

# Check TypeScript types
npm run astro check
```

### Performance Notes

- Build process is extremely fast (~3-5 seconds)
- Development server starts quickly (~2-5 seconds)
- Hot reload enabled for efficient development
- Static site generation for optimal performance

## Testing and Validation

After making changes, manually validate:

1. **Homepage Loading**
   - Verify dark theme loads correctly
   - Check all sections are visible: About, Skills, Metrics, Projects, Services, Contact

2. **Navigation**
   - Test smooth scrolling between sections
   - Verify mobile menu functionality

3. **Interactive Elements**
   - Contact form functionality
   - Button hover states
   - Skill progress bars
   - Project card links

4. **Responsive Design**
   - Test on different screen sizes
   - Verify mobile menu opens/closes properly
   - Check accessibility features

5. **Build Validation**
   ```bash
   npm run build
   npm run preview
   npm run lint
   npm run format:check
   npm run astro check
   ```

## Configuration Files

- **astro.config.mjs**: Astro configuration with TailwindCSS integration
- **tsconfig.json**: TypeScript configuration with path aliases
- **eslint.config.ts**: ESLint rules and configuration
- **package.json**: Dependencies and npm scripts
- **src/data/site.ts**: Centralized site data and configuration

## Path Aliases

The project uses TypeScript path aliases for clean imports:

- `@/*` maps to `src/*`
- Import components with: `import Component from "@/components/..."`

## Deployment

The project generates static files in `./dist/` suitable for deployment to:

- **Vercel**: Automatic deployment from Git
- **Netlify**: Static site hosting
- **GitHub Pages**: Free hosting option
- **Any static hosting**: Serve files from `./dist/`

## Performance Characteristics

- **Build Time**: ~3-5 seconds (very fast)
- **Development Server**: ~2-5 seconds to start
- **Hot Reload**: Instant updates during development
- **Bundle Size**: Optimized through Astro's static generation
- **Lighthouse Score**: Optimized for high performance scores

## Critical Reminders

- ⏰ **NEVER CANCEL** running commands - let them complete naturally
- 🧪 **ALWAYS test manually** after making changes
- 🔍 **Build and preview** before considering work complete
- 📝 **Run code quality checks** before commits
- 🎯 **Use path aliases** (`@/`) for clean imports
- 📱 **Test mobile responsiveness** and accessibility

## Support

For questions or issues, refer to:

- **README.md**: Detailed setup and usage instructions
- **ROADMAP.md**: Project roadmap and future plans
- **Astro Documentation**: https://docs.astro.build/
- **TailwindCSS Documentation**: https://tailwindcss.com/docs
