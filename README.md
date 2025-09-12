frontend/README.md

# 🚀 Backend Developer Portfolio

[![Astro](https://img.shields.io/badge/Astro-5.13.7-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.13-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

Un portfolio moderno y elegante construido con **Astro.js**, **TailwindCSS** y **TypeScript**, diseñado para destacar habilidades en desarrollo backend, proyectos destacados y servicios profesionales.

## ✨ Características Principales

- 🎨 **Tema Oscuro Elegante**: Diseño moderno con gradientes y animaciones suaves
- 📱 **Completamente Responsivo**: Optimizado para dispositivos móviles y desktop
- ⚡ **Rendimiento Optimizado**: Generación estática rápida con Astro.js
- 🛠️ **Tecnologías Modernas**: TypeScript, TailwindCSS v4, y mejores prácticas
- 📧 **Formulario de Contacto**: Integración completa para consultas profesionales
- 🎯 **Secciones Especializadas**: About, Skills, Projects, Pricing y Contact

## 🛠️ Tecnologías Utilizadas

### Core Framework

- **Astro.js 5.13.7** - Generador de sitios estáticos ultrarrápido
- **TypeScript 5.9.2** - Tipado estático para mayor robustez

### Estilos y UI

- **TailwindCSS 4.1.13** - Framework CSS utility-first
- **CSS Variables** - Tema oscuro personalizado con variables CSS

### Desarrollo y Calidad

- **ESLint** - Linting y formateo de código
- **Prettier** - Formateo automático del código
- **@astrojs/check** - Validación de tipos para archivos .astro

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js 18+** (verifica con `node --version`)
- **npm** o **bun** (recomendado bun por el archivo `bun.lock`)

### Instalación

```bash
# Clona el repositorio
git clone <tu-repositorio-url>
cd frontend

# Instala dependencias (toma ~45-60 segundos)
npm install
# o si usas bun:
bun install

# Verifica la instalación
npm run astro -- --version
```

## 📋 Scripts Disponibles

| Comando               | Descripción                                               | Tiempo Estimado |
| --------------------- | --------------------------------------------------------- | --------------- |
| `npm run dev`         | Inicia servidor de desarrollo en `http://localhost:4321/` | ~2-5s           |
| `npm run build`       | Construye para producción en `./dist/`                    | ~3-5s           |
| `npm run preview`     | Vista previa del build en `http://localhost:4321/`        | ~2-3s           |
| `npm run lint`        | Ejecuta ESLint para verificar código                      | ~5-10s          |
| `npm run lint:fix`    | Corrige automáticamente errores de linting                | ~5-10s          |
| `npm run format`      | Formatea código con Prettier                              | ~5-10s          |
| `npm run astro check` | Valida tipos TypeScript en archivos .astro                | ~5-10s          |

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/
│   │   ├── layouts/          # Header, Footer, SectionHeader
│   │   ├── sections/         # About, Skills, Projects, Pricing, Contact
│   │   └── ui/               # Componentes reutilizables (Card, Badge, Button)
│   ├── layouts/
│   │   └── Layout.astro      # Layout base con meta tags y estructura
│   ├── pages/
│   │   └── index.astro       # Página principal
│   └── styles/
│       └── main.css          # Estilos globales y tema oscuro
├── public/                   # Assets estáticos (imágenes, favicon)
├── astro.config.mjs          # Configuración de Astro
├── package.json              # Dependencias y scripts
├── tsconfig.json             # Configuración TypeScript
└── tailwind.config.mjs       # Configuración TailwindCSS
```

## 🎯 Secciones del Portfolio

### 👨‍💻 Sobre Mí

- Perfil profesional con avatar y descripción
- Habilidades destacadas en badges
- Características principales: código claro, rendimiento, seguridad, observabilidad

### 🛠️ Habilidades Técnicas

- Barra de progreso para cada tecnología
- Categorización por áreas (Backend, Bases de Datos, DevOps, etc.)
- Animaciones suaves al hacer scroll

### 💼 Proyectos

- Tarjetas de proyectos con descripciones
- Enlaces a repositorios y demos
- Tecnologías utilizadas en cada proyecto

### 💰 Precios

- Paquetes de servicios (Básico, Profesional, Enterprise)
- Características incluidas en cada plan
- Llamado a la acción para contactar

### 📞 Contacto

- Formulario funcional con validación
- Información de contacto (email, LinkedIn, etc.)
- Redes sociales y enlaces profesionales

## 🔧 Desarrollo

### Servidor de Desarrollo

```bash
npm run dev
```

- Hot reload automático
- Servidor en `http://localhost:4321/`
- Integración con Vite para builds rápidos

### Build de Producción

```bash
npm run build
```

- Genera archivos estáticos en `./dist/`
- Optimización automática de CSS y JS
- Tiempo de build: ~3-5 segundos

### Validación de Tipos

```bash
npm run astro check
```

- Verifica tipos en archivos .astro y .ts
- Requiere instalación previa de dependencias de desarrollo

## 🎨 Personalización

### Cambiar Contenido

- **Texto**: Edita directamente en los componentes `.astro`
- **Estilos**: Modifica `src/styles/main.css` o usa clases Tailwind
- **Imágenes**: Agrega a `public/` y referencia con `/nombre-archivo.ext`

### Tema y Diseño

- Variables CSS en `src/styles/main.css` para colores del tema oscuro
- Gradientes y animaciones personalizables
- Fuentes y tipografía ajustables

## 📱 Validación Manual

Después de cambios, valida manualmente:

1. **Carga de Homepage**: Verifica tema oscuro y todas las secciones
2. **Navegación**: Prueba scroll suave entre secciones
3. **Elementos Interactivos**: Formulario de contacto, botones, barras de progreso
4. **Responsive**: Prueba en diferentes tamaños de pantalla
5. **Build**: Ejecuta `npm run build` y `npm run preview`

## 🚀 Despliegue

### Preparación para Producción

```bash
# Build final
npm run build

# Vista previa local
npm run preview

# El contenido de ./dist/ está listo para desplegar
```

### Opciones de Despliegue

- **Vercel**: Despliegue automático desde Git
- **Netlify**: Integración con builds estáticos
- **GitHub Pages**: Despliegue gratuito
- **Servidor propio**: Sirve archivos desde `./dist/`

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

⭐ **¡Si te gusta este proyecto, dale una estrella!**

Hecho con ❤️ usando Astro.js y TailwindCSS
