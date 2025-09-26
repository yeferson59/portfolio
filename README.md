# 🚀 Backend Developer Portfolio

[![Astro](https://img.shields.io/badge/Astro-5.13.7-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.13-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![bun.js](https://img.shields.io/badge/bun.js-1.2+-F5BABB?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)

A modern and elegant portfolio built with **Astro.js**, **TailwindCSS**, and **TypeScript**, designed to showcase backend development skills, featured projects, and professional services.

## ✨ Key Features

- 🎨 **Elegant Dark Theme**: Modern design with gradients and smooth animations
- 📱 **Fully Responsive**: Optimized for mobile and desktop devices
- ⚡ **Performance Optimized**: Fast static generation with Astro.js
- 🛠️ **Modern Technologies**: TypeScript, TailwindCSS v4, and best practices
- 📧 **Contact Form**: Complete integration for professional inquiries
- 🎯 **Specialized Sections**: About, Skills, Projects, Services, and Contact

## 🛠️ Technologies Used

### Core Framework

- **Astro.js 5.14.0** - Ultra-fast static site generator
- **TypeScript 5.9.2** - Static typing for greater robustness

### Styles and UI

- **TailwindCSS 4.1.13** - Utility-first CSS framework
- **CSS Variables** - Custom dark theme with CSS variables

### Development and Quality

- **ESLint** - Code linting and formatting
- **Prettier** - Automatic code formatting
- **@astrojs/check** - Type validation for .astro files

## 🚀 Installation and Setup

### Prerequisites

- **Node.js 18+** (verify with `node --version`)
- **npm** or **bun** (bun recommended due to `bun.lock` file)

### Installation

```bash
# Clone the repository
git clone <your-repository-url>
cd portfolio

# Install dependencies (takes ~45-60 seconds)
npm install
# or if using bun:
bun install

# Verify installation
npm run astro -- --version
```

## 📋 Available Scripts

| Command               | Description                                          | Estimated Time |
| --------------------- | ---------------------------------------------------- | -------------- |
| `npm run dev`         | Start development server at `http://localhost:4321/` | ~2-5s          |
| `npm run build`       | Build for production in `./dist/`                    | ~3-5s          |
| `npm run preview`     | Preview build at `http://localhost:4321/`            | ~2-3s          |
| `npm run lint`        | Run ESLint to check code                             | ~5-10s         |
| `npm run lint:fix`    | Automatically fix linting issues                     | ~5-10s         |
| `npm run format`      | Format code with Prettier                            | ~5-10s         |
| `npm run astro check` | Validate TypeScript in .astro files                  | ~5-10s         |

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── layouts/          # Header, Footer, SectionHeader
│   │   ├── sections/         # About, Skills, Projects, Services, Contact
│   │   └── ui/               # Reusable components (Card, Badge, Button)
│   ├── layouts/
│   │   └── Layout.astro      # Base layout with meta tags and structure
│   ├── pages/
│   │   └── index.astro       # Main page
│   └── styles/
│       └── main.css          # Global styles and dark theme
├── public/                   # Static assets (images, favicon)
├── astro.config.mjs          # Astro configuration
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── tailwind.config.mjs       # TailwindCSS configuration
```

## 🎯 Portfolio Sections

### 👨‍💻 About Me

- Professional profile with avatar and description
- Featured skills in badges
- Key characteristics: clean code, performance, security, observability

### 🛠️ Technical Skills

- Progress bar for each technology
- Categorization by areas (Backend, Databases, DevOps, etc.)
- Smooth animations on scroll

### 💼 Projects

- Project cards with descriptions
- Links to repositories and demos
- Technologies used in each project

### 💰 Services

- Service packages (Basic, Professional, Enterprise)
- Features included in each plan
- Call-to-action to contact

### 📞 Contact

- Functional form with validation
- Contact information (email, LinkedIn, etc.)
- Social networks and professional links

## 🔧 Development

### Development Server

```bash
npm run dev
```

- Automatic hot reload
- Server at `http://localhost:4321/`
- Vite integration for fast builds

### Production Build

```bash
npm run build
```

- Generates static files in `./dist/`
- Automatic CSS and JS optimization
- Build time: ~3-5 seconds

### Type Validation

```bash
npm run astro check
```

- Verifies types in .astro and .ts files
- Requires prior installation of development dependencies

## 🎨 Customization

### Change Content

- **Text**: Edit directly in `.astro` components
- **Styles**: Modify `src/styles/main.css` or use Tailwind classes
- **Images**: Add to `public/` and reference with `/filename.ext`

### Theme and Design

- CSS variables in `src/styles/main.css` for dark theme colors
- Customizable gradients and animations
- Adjustable fonts and typography

## 📱 Manual Validation

After changes, manually validate:

1. **Homepage Loading**: Verify dark theme and all sections
2. **Navigation**: Test smooth scrolling between sections
3. **Interactive Elements**: Contact form, buttons, progress bars
4. **Responsive**: Test on different screen sizes
5. **Build**: Run `npm run build` and `npm run preview`

## 🚀 Deployment

### Production Preparation

```bash
# Final build
npm run build

# Local preview
npm run preview

# Content in ./dist/ is ready to deploy
```

### Deployment Options

- **Vercel**: Automatic deployment from Git
- **Netlify**: Static build integration
- **GitHub Pages**: Free deployment
- **Own server**: Serve files from `./dist/`

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is under the MIT License - see the [LICENSE](LICENSE) file for more details.

---

⭐ **If you like this project, give it a star!**

Made with ❤️ using Astro.js and TailwindCSS
