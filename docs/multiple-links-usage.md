# Multiple Links in Projects

This guide explains how to use the enhanced multiple links feature in project cards, which allows you to showcase different repositories, demos, documentation, and APIs for complex projects like microservices architectures.

## Schema Structure

The new `links` field replaces the old `href` field and accepts an array of link objects:

```yaml
links:
  - name: "Link Display Name"
    url: "https://github.com/username/repo"
    type: "repository" # optional, defaults to "repository"
```

## Supported Link Types

### 1. Repository (`repository`)

For source code repositories, GitHub repos, GitLab projects, etc.

```yaml
- name: "Main Repository"
  url: "https://github.com/username/main-repo"
  type: "repository"
```

### 2. Demo (`demo`)

For live demos, deployed applications, preview sites, etc.

```yaml
- name: "Live Demo"
  url: "https://my-app.vercel.app"
  type: "demo"
```

### 3. Documentation (`documentation`)

For API docs, technical documentation, README sections, etc.

```yaml
- name: "API Documentation"
  url: "https://docs.my-api.com"
  type: "documentation"
```

### 4. API (`api`)

For API endpoints, health checks, NPM packages, etc.

```yaml
- name: "Health Endpoint"
  url: "https://api.my-service.com/health"
  type: "api"
```

## Real-world Examples

### Microservices Architecture

Perfect for showcasing distributed systems with multiple repositories:

```yaml
---
title: "E-commerce Microservices"
description: "Scalable microservices architecture for e-commerce platform"
stack: ["Node.js", "Docker", "Kubernetes", "PostgreSQL", "Redis"]
year: 2025
status: "Active"
links:
  - name: "API Gateway"
    url: "https://github.com/username/api-gateway"
    type: "repository"
  - name: "User Service"
    url: "https://github.com/username/user-service"
    type: "repository"
  - name: "Order Service"
    url: "https://github.com/username/order-service"
    type: "repository"
  - name: "Payment Service"
    url: "https://github.com/username/payment-service"
    type: "repository"
  - name: "Live Demo"
    url: "https://ecommerce-demo.com"
    type: "demo"
  - name: "API Docs"
    url: "https://api-docs.ecommerce.com"
    type: "documentation"
featured: true
category: "Microservices"
---
```

### Full-stack Application

Showing both frontend and backend repositories:

```yaml
links:
  - name: "Backend API"
    url: "https://github.com/username/backend"
    type: "repository"
  - name: "Frontend App"
    url: "https://github.com/username/frontend"
    type: "repository"
  - name: "Live App"
    url: "https://myapp.com"
    type: "demo"
  - name: "API Documentation"
    url: "https://github.com/username/backend#api-documentation"
    type: "documentation"
```

### NPM Package Project

For open-source libraries and tools:

```yaml
links:
  - name: "Source Code"
    url: "https://github.com/username/my-package"
    type: "repository"
  - name: "NPM Package"
    url: "https://www.npmjs.com/package/my-package"
    type: "api"
  - name: "Documentation"
    url: "https://username.github.io/my-package"
    type: "documentation"
```

## UI Display Features

### Visual Indicators

Each link type has a distinctive icon:

- **Repository**: GitHub-style icon
- **Demo**: Play/check icon
- **Documentation**: Document icon
- **API**: API/connection icon

### Responsive Design

- **Desktop**: Links display horizontally in the project card footer
- **Tablet**: Links wrap to multiple rows as needed
- **Mobile**: Links stack vertically for better touch interaction

### Hover Effects

- Subtle animation on hover
- Color changes to indicate interactivity
- Shadow effects for better depth perception

## Best Practices

### 1. Naming Conventions

- Use clear, descriptive names: "API Gateway" instead of "Gateway"
- Be specific: "User Management Service" instead of "Service"
- Keep names concise but meaningful

### 2. Link Organization

- Order links by importance (main repo first, then supporting repos)
- Group related repositories together
- Place demos and documentation at the end

### 3. Type Selection

- Use `repository` for all source code
- Use `demo` for live, interactive applications
- Use `documentation` for guides, APIs docs, wikis
- Use `api` for endpoints, packages, tools

### 4. Microservices Projects

- Start with the main entry point (API Gateway, Client)
- List services in logical order (Auth → User → Business Logic)
- Include infrastructure repositories if relevant
- Always provide a demo or documentation link when possible

## Migration from Single `href`

If you have existing projects with the old `href` field, convert them like this:

**Old format:**

```yaml
href: "https://github.com/username/my-repo"
```

**New format:**

```yaml
links:
  - name: "Main Repository"
    url: "https://github.com/username/my-repo"
    type: "repository"
```

## Technical Implementation

The multiple links feature is implemented in:

- **Schema**: `src/content.config.ts` - defines the links array structure
- **Component**: `src/components/layouts/ProjectCard.astro` - renders the links
- **Styles**: `src/styles/components.css` - handles responsive layout and theming
- **Types**: Auto-generated from the schema for type safety

## Performance Considerations

- Links are rendered statically at build time
- Icons are inlined SVGs for optimal performance
- Responsive styles use CSS Grid and Flexbox for efficient layouts
- No JavaScript required for link functionality
