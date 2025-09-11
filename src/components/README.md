# Component Library

This directory contains the refactored and optimized Astro components for the Backend Developer Portfolio.

## Core UI Components

### Button (`Button.astro`)

Flexible button component with multiple variants and sizes.

**Props:**

- `variant`: 'primary' | 'secondary' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `href`: Optional URL for link behavior
- `fullWidth`: Boolean for full-width buttons
- `disabled`: Boolean for disabled state

**Usage:**

```astro
<Button variant="primary" size="lg" href="#contact">
  Contact Me
  <svg>...</svg>
</Button>
```

### Card (`Card.astro`)

Container component for grouping related content.

**Props:**

- `variant`: 'default' | 'compact' | 'raised'
- `hover`: Boolean for hover effects (default: true)
- `class`: Additional CSS classes

**Usage:**

```astro
<Card variant="raised" class="custom-class">
  <h3>Card Title</h3>
  <p>Card content...</p>
</Card>
```

### Badge (`Badge.astro`)

Small indicator component for labels and tags.

**Props:**

- `variant`: 'default' | 'primary' | 'secondary' | 'success'
- `class`: Additional CSS classes

**Usage:**

```astro
<Badge variant="primary">React</Badge>
<Badge variant="secondary">Node.js</Badge>
```

### SectionHeader (`SectionHeader.astro`)

Consistent header component for sections.

**Props:**

- `title`: Required section title
- `subtitle`: Optional description text
- `class`: Additional CSS classes

**Usage:**

```astro
<SectionHeader
  title="About Me"
  subtitle="Learn more about my background and experience"
/>
```

## Specialized Components

### Logo (`Logo.astro`)

Site branding component with optional text.

**Props:**

- `showText`: Boolean to show/hide text (default: true)
- `class`: Additional CSS classes

### Navigation (`Navigation.astro`)

Desktop navigation menu with predefined links.

**Props:**

- `class`: Additional CSS classes

### MobileMenu (`MobileMenu.astro`)

Mobile navigation drawer with animations.

**Props:**

- `isOpen`: Boolean for open state
- `class`: Additional CSS classes

### SkillCard (`SkillCard.astro`)

Displays skills with progress bars and icons.

**Props:**

- `title`: Card title
- `icon`: SVG icon string
- `skills`: Array of skill objects
- `iconVariant`: 'primary' | 'secondary'

**Usage:**

```astro
<SkillCard
  title="Languages"
  icon="<svg>...</svg>"
  skills={[
    { name: "JavaScript", level: 95, variant: "primary" },
    { name: "Python", level: 85, variant: "secondary" },
  ]}
/>
```

### ProjectCard (`ProjectCard.astro`)

Displays project information with technologies and status.

**Props:**

- `title`: Project name
- `description`: Project description
- `stack`: Array of technology names
- `year`: Project year
- `status`: Current status
- `href`: Project link

### PricingCard (`PricingCard.astro`)

Pricing plan display with features list.

**Props:**

- `name`: Plan name
- `subtitle`: Plan description
- `price`: Price string
- `period`: Optional billing period
- `description`: Plan description
- `features`: Array of feature strings
- `cta`: Call-to-action text
- `popular`: Boolean for popular badge
- `href`: Link destination

## Layout Components

### Header (`Header.astro`)

Main site header with navigation and mobile menu.

### Footer (`Footer.astro`)

Site footer with links, social media, and newsletter signup.

### ScrollReveal (`ScrollReveal.astro`)

Handles scroll-based animations and smooth scrolling.

## Section Components

### About (`About.astro`)

About section with profile, skills, and call-to-action.

### Skills (`Skills.astro`)

Technical skills section using SkillCard components.

### Projects (`Projects.astro`)

Portfolio projects section using ProjectCard components.

### Pricing (`Pricing.astro`)

Service pricing section using PricingCard components.

### Contact (`Contact.astro`)

Contact information and form section.

## Design Principles

### 1. Composition over Configuration

Components use slots and props for flexibility:

```astro
<Card>
  <h3>Custom Title</h3>
  <Button variant="primary">Action</Button>
</Card>
```

### 2. Consistent Props Interface

All components follow similar prop patterns:

- `variant` for style variations
- `size` for sizing options
- `class` for custom styling
- Boolean flags for features

### 3. Accessibility First

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility

### 4. Performance Optimized

- Minimal JavaScript
- CSS-only animations
- Efficient scroll handling
- Image lazy loading

## Styling Approach

### CSS Classes

Components use semantic CSS classes from the design system:

```css
.btn                 /* Base button */
.btn--primary        /* Primary variant */
.btn--sm            /* Small size */
.card               /* Base card */
.card--raised       /* Elevated variant */
```

### Custom Properties

Utilize CSS custom properties for theming:

```css
color: var(--color-text-primary);
padding: var(--space-md);
border-radius: var(--radius-lg);
```

## Migration Notes

### From Legacy Components

- Removed inline styles
- Consolidated CSS classes
- Simplified prop interfaces
- Improved TypeScript types
- Enhanced accessibility

### Breaking Changes

- Button variants changed from 'accent' to 'primary'
- Card padding now controlled by variants
- Some utility classes renamed for consistency

## Testing

### Manual Testing Checklist

- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Dark theme consistency
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Animation performance
- [ ] Cross-browser compatibility

### Accessibility Testing

- Use axe-core browser extension
- Test with screen readers (NVDA, VoiceOver)
- Verify keyboard-only navigation
- Check color contrast ratios

## Future Enhancements

1. **Storybook Integration**: Component documentation and testing
2. **Unit Tests**: Automated component testing
3. **Visual Regression**: Automated visual testing
4. **Performance Monitoring**: Component performance metrics
