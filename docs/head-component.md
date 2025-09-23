# Head Component Usage Guide

The Head component is a comprehensive SEO-optimized component for managing the `<head>` section of your Astro pages. It provides dynamic metadata configuration and ensures your pages are search engine friendly.

## Basic Usage

### Default Configuration (Homepage)

```astro
---
import Layout from "@/layouts/Layout.astro";
---

<Layout>
  <!-- Uses default site metadata -->
  <h1>Welcome to my portfolio</h1>
</Layout>
```

### Custom Page Title and Description

```astro
---
import Layout from "@/layouts/Layout.astro";
---

<Layout
  head={{
    title: "About Me",
    description:
      "Learn more about my background in backend development and system architecture.",
    keywords: ["about", "backend developer", "experience"],
  }}
>
  <h1>About Me</h1>
</Layout>
```

## Advanced Usage Examples

### Blog Post with Full Metadata

```astro
---
import Layout from "@/layouts/Layout.astro";

const head = {
  title: "Building Scalable APIs with Node.js",
  description:
    "Complete guide to building production-ready APIs with Express.js, authentication, and monitoring.",
  keywords: ["Node.js", "API", "Express.js", "backend", "tutorial"],
  type: "article" as const,
  author: "Yeferson Toloza C.",
  publishedTime: "2024-01-15T10:00:00Z",
  modifiedTime: "2024-01-20T15:30:00Z",
  section: "Backend Development",
  tags: ["Node.js", "API Development", "Backend"],
  image: {
    url: "/blog/nodejs-api-guide.jpg",
    alt: "Node.js API Development Guide",
    width: 1200,
    height: 630,
  },
};
---

<Layout {head}>
  <article>
    <h1>Building Scalable APIs with Node.js</h1>
    <!-- Article content -->
  </article>
</Layout>
```

### Private/Admin Page (Non-indexable)

```astro
---
import Layout from "@/layouts/Layout.astro";

const head = {
  title: "Admin Dashboard",
  description: "Internal administration panel - not for public access.",
  noindex: true,
  nofollow: true,
  robots: {
    noarchive: true,
    noimageindex: true,
    nocache: true,
  },
};
---

<Layout {head}>
  <h1>Admin Dashboard</h1>
  <!-- Admin content -->
</Layout>
```

### Project Showcase Page

```astro
---
import Layout from "@/layouts/Layout.astro";

const head = {
  title: "E-commerce API Project",
  description:
    "Scalable REST API built with Node.js, PostgreSQL, and Redis for high-performance e-commerce applications.",
  keywords: [
    "e-commerce",
    "API",
    "Node.js",
    "PostgreSQL",
    "Redis",
    "microservices",
  ],
  canonical: "https://yeferson-portfolio.netlify.app/projects/ecommerce-api",
  image: {
    url: "/projects/ecommerce-api-preview.jpg",
    alt: "E-commerce API Architecture Diagram",
    width: 1200,
    height: 630,
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: "E-commerce API",
    description: "Scalable REST API for e-commerce applications",
    programmingLanguage: "JavaScript",
    codeRepository: "https://github.com/yeferson59/ecommerce-api",
    author: {
      "@type": "Person",
      name: "Yeferson Toloza C.",
      email: "yefersontoloza59@gmail.com",
    },
  },
};
---

<Layout {head}>
  <h1>E-commerce API Project</h1>
  <!-- Project details -->
</Layout>
```

## Component Props Reference

### Required Props

None - all props are optional and have sensible defaults.

### Optional Props

| Prop             | Type                                  | Default            | Description                               |
| ---------------- | ------------------------------------- | ------------------ | ----------------------------------------- |
| `title`          | `string`                              | Site title         | Page title (formatted with titleTemplate) |
| `description`    | `string`                              | Site description   | Meta description for search engines       |
| `keywords`       | `string[]`                            | `[]`               | Additional keywords (merged with default) |
| `canonical`      | `string`                              | Current page URL   | Canonical URL for the page                |
| `image`          | `object`                              | Site default image | Open Graph/Twitter image                  |
| `type`           | `"website" \| "article" \| "profile"` | `"website"`        | Open Graph type                           |
| `noindex`        | `boolean`                             | `false`            | Prevent search engine indexing            |
| `nofollow`       | `boolean`                             | `false`            | Prevent following links                   |
| `robots`         | `object`                              | `{}`               | Additional robots directives              |
| `author`         | `string`                              | Site author        | Content author                            |
| `publishedTime`  | `string`                              | `undefined`        | Publication date (ISO 8601)               |
| `modifiedTime`   | `string`                              | `undefined`        | Last modified date (ISO 8601)             |
| `section`        | `string`                              | `undefined`        | Article section/category                  |
| `tags`           | `string[]`                            | `[]`               | Article tags                              |
| `structuredData` | `object`                              | Auto-generated     | Custom JSON-LD data                       |

## SEO Features Included

### ✅ Search Engine Optimization

- Dynamic title and meta description
- Keywords optimization
- Canonical URLs
- Robots meta directives
- Language and locale settings

### ✅ Social Media Sharing

- Open Graph tags (Facebook, LinkedIn)
- Twitter Card metadata
- Custom images for social sharing
- Rich preview support

### ✅ Structured Data

- JSON-LD structured data
- Schema.org markup
- Article and website types
- Author and publisher information

### ✅ Performance

- DNS prefetching for external resources
- Optimized meta tag order
- Minimal redundancy

### ✅ Accessibility

- Proper lang attribute
- Theme color for mobile browsers
- Skip links support

## Search Engine Crawlability

### Crawlable Pages (Default)

```astro
<Layout
  head={{
    title: "Public Page",
    description: "This page should be indexed by search engines.",
  }}
/>
```

### Non-crawlable Pages

```astro
<Layout
  head={{
    title: "Private Page",
    noindex: true,
    nofollow: true,
  }}
/>
```

### Partially Restricted

```astro
<Layout
  head={{
    title: "Limited Access",
    noindex: false,
    nofollow: true,
    robots: {
      noarchive: true, // Don't cache this page
      noimageindex: true, // Don't index images
    },
  }}
/>
```

## Configuration

The component uses `siteMetadata` from `@/data/site.ts` for default values. Update this file to change site-wide defaults:

```typescript
export const siteMetadata = {
  title: "Your Site Title",
  titleTemplate: "%s | Your Site",
  description: "Your site description",
  siteUrl: "https://your-domain.com",
  // ... other settings
};
```

## Best Practices

1. **Always provide a title and description** for important pages
2. **Use descriptive, keyword-rich titles** (50-60 characters)
3. **Keep descriptions under 160 characters** for optimal display
4. **Set noindex=true for admin/private pages**
5. **Use canonical URLs for duplicate content**
6. **Provide custom images for important pages**
7. **Use structured data for rich snippets**
8. **Test with Google's Rich Results Test tool**

## Testing Your SEO

Use these tools to validate your implementation:

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Schema.org Validator](https://validator.schema.org/)
