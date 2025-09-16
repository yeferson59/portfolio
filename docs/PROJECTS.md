# Projects Collection Documentation

This documentation describes the project content structure for the portfolio website.

## Structure

- Each project is a markdown file with frontmatter metadata
- Projects are automatically loaded and sorted by featured status, year, and status
- All projects are validated against the schema defined in `content.config.ts`

## Available Projects

- **ecommerce.md** - Scalable E-commerce API (2025, Featured)
- **analytics-engine.md** - Real-time Analytics Engine (2024, Featured)
- **microservices-platform.md** - Microservices Platform (2024, Featured)
- **api-gateway.md** - API Gateway & Load Balancer (2024)
- **devops-automation.md** - DevOps Automation Suite (2023)
- **distributed-storage.md** - Distributed File Storage (2023)
- **blockchain-monitor.md** - Blockchain Network Monitor (2023)

## Schema

Each project must include:

- `title`: Project name
- `description`: Project description
- `stack`: Array of technologies used
- `year`: Year of development
- `status`: One of "Active", "Completed", "In Progress", "Archived", "Closed"
- `href`: URL to project repository
- `featured`: Boolean (optional, defaults to false)
- `category`: Project category (optional)

## Categories

- API
- Microservices
- DevOps
- Analytics
- Blockchain
- Storage
- E-commerce

## Utilities

The `src/utils/projects.ts` file provides helper functions for managing and filtering projects:

- `getAllProjects()` - Get all projects sorted by priority
- `getFeaturedProjects()` - Get only featured projects
- `getProjectsByCategory(category)` - Filter by category
- `getProjectsByStatus(status)` - Filter by status
- `getProjectStats()` - Get comprehensive statistics
