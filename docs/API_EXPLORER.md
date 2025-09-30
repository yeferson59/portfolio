# 🚀 Interactive API Explorer

## Descripción

El **Interactive API Explorer** es una herramienta completa y desacoplada para probar APIs de forma interactiva directamente desde el navegador. Permite enviar requests HTTP reales, visualizar respuestas con métricas de rendimiento, y generar código en múltiples lenguajes de programación.

## ✨ Características Principales

### 🎯 Testing en Tiempo Real

- Envío de requests HTTP reales a APIs configuradas
- Soporte para todos los métodos HTTP (GET, POST, PUT, DELETE, PATCH, etc.)
- Visualización de respuestas con formato JSON automático
- Métricas de rendimiento en tiempo real (duración, tamaño, cache)

### 🔐 Sistema de Autenticación

- **Bearer Token**: Para APIs con JWT
- **API Key**: Soporte en headers o query params
- **Basic Auth**: Autenticación básica HTTP
- **OAuth2**: Flujo de autenticación OAuth2
- Configuración flexible por API y endpoint

### 💻 Generación de Código

Genera snippets listos para usar en:

- **cURL**: Comandos de terminal
- **JavaScript**: Fetch API con async/await
- **Python**: Librería requests
- **Go**: Cliente HTTP nativo
- **PHP**: cURL wrapper
- **Java**: HttpClient (Java 11+)
- **Ruby**: Net::HTTP

### 📊 Métricas de Performance

- Tiempo de respuesta (ms)
- Tamaño del payload (KB/MB)
- Estado del cache (HIT/MISS)
- Timestamp de la request
- Códigos de estado HTTP con categorización

### 🎨 Interfaz de Usuario

- Editor JSON interactivo con validación
- Syntax highlighting para código
- Tabs organizados por tipo de parámetro
- Indicadores visuales de estado HTTP
- Diseño responsive (desktop, tablet, mobile)

## 🏗️ Arquitectura

### Estructura de Carpetas

```
src/
├── utils/api-explorer/
│   ├── types.ts                    # Definiciones TypeScript completas
│   ├── index.ts                    # Exportaciones centralizadas
│   │
│   ├── config/                     # Configuraciones de APIs
│   │   ├── index.ts                # Registry central de APIs
│   │   ├── ecommerce-api.ts        # Config E-commerce API
│   │   ├── fastapi-template.ts     # Config FastAPI Template
│   │   └── finance-mcp.ts          # Config Finance MCP API
│   │
│   ├── client/                     # Cliente HTTP
│   │   ├── api-client.ts           # Cliente HTTP genérico
│   │   └── request-builder.ts      # Constructor de requests
│   │
│   ├── validation/                 # Validación
│   │   └── param-validator.ts      # Validación de parámetros
│   │
│   ├── code-generation/            # Generadores de código
│   │   └── generators.ts           # Generadores multi-lenguaje
│   │
│   └── metrics/                    # Tracking de métricas
│       └── performance-tracker.ts  # Análisis de performance
│
└── components/api-explorer/
    ├── core/                       # Componentes principales
    │   └── APIExplorer.astro       # Componente principal
    │
    ├── request/                    # Componentes de request
    │   └── (Future components)
    │
    ├── response/                   # Componentes de response
    │   ├── StatusIndicator.astro   # Indicador de estado HTTP
    │   └── MetricsPanel.astro      # Panel de métricas
    │
    └── ui/                         # Componentes UI reutilizables
        ├── JSONEditor.astro        # Editor JSON con validación
        ├── CodeBlock.astro         # Bloque de código con copy
        └── TabPanel.astro          # Panel de tabs genérico
```

## 📝 Configuración de APIs

### Estructura de Configuración

Cada API se define mediante un objeto `APIConfiguration`:

```typescript
import type { APIConfiguration } from "@/utils/api-explorer/types";

export const myAPIConfig: APIConfiguration = {
  id: "my-api",
  name: "My API",
  baseUrl: "https://api.example.com/v1",
  version: "1.0.0",
  description: "API description",

  // Autenticación global (opcional)
  authentication: {
    type: "bearer",
    required: true,
    tokenEndpoint: "/auth/token",
    description: "JWT token",
  },

  // Headers globales
  globalHeaders: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  // Categorías para organización
  categories: ["Users", "Products", "Orders"],

  // Rate limiting info
  rateLimit: {
    requests: 100,
    period: "1 minute",
  },

  // Endpoints
  endpoints: [
    {
      id: "get-users",
      name: "Get Users",
      method: "GET",
      path: "/users",
      category: "Users",
      description: "Retrieve list of users",

      // Parámetros del endpoint
      parameters: {
        query: {
          page: {
            type: "integer",
            default: 1,
            description: "Page number",
          },
          limit: {
            type: "integer",
            default: 10,
            max: 100,
            description: "Items per page",
          },
        },
      },

      // Ejemplos (opcional)
      examples: [
        {
          request: {
            query: { page: 1, limit: 10 },
          },
          response: {
            status: 200,
            body: {
              data: [],
              meta: { total: 100 },
            },
          },
        },
      ],
    },
  ],
};
```

### Agregar Nueva API

1. Crear archivo de configuración en `src/utils/api-explorer/config/my-api.ts`
2. Definir la configuración usando el tipo `APIConfiguration`
3. Importar y agregar al array en `src/utils/api-explorer/config/index.ts`:

```typescript
import { myAPIConfig } from "./my-api";

export const availableAPIs: APIConfiguration[] = [
  ecommerceAPIConfig,
  fastapiTemplateConfig,
  financeMCPConfig,
  myAPIConfig, // Nueva API
];
```

## 🎯 Uso del API Explorer

### En una Página Astro

```astro
---
import APIExplorer from "@/components/api-explorer/core/APIExplorer.astro";
---

<APIExplorer defaultAPI="ecommerce-api" />
```

### Parámetros del Componente

- `defaultAPI` (opcional): ID de la API a mostrar por defecto
- `className` (opcional): Clases CSS adicionales

## 🔧 APIs Configuradas

### 1. E-commerce API

- **Base URL**: `https://api.ecommerce-demo.example.com/v1`
- **Auth**: Bearer Token (JWT)
- **Endpoints**: 11
- **Categorías**: Authentication, Products, Orders, Users, Cart, Payments

### 2. FastAPI Template

- **Base URL**: `https://api.fastapi-template.example.com/api/v1`
- **Auth**: OAuth2 (Bearer Token)
- **Endpoints**: 10
- **Categorías**: Authentication, Users, Items, Health

### 3. Finance MCP API

- **Base URL**: `https://api.finance-mcp.example.com/v1`
- **Auth**: API Key (Header)
- **Endpoints**: 12
- **Categorías**: Market Data, Stocks, Crypto, News, Analytics

## 📊 Métricas y Performance

### Sistema de Tracking

El sistema incluye tracking completo de métricas:

```typescript
import {
  analyzeMetrics,
  exportMetrics,
} from "@/utils/api-explorer/metrics/performance-tracker";

// Analizar historial de requests
const summary = analyzeMetrics(requestHistory);

// Exportar métricas como JSON
const jsonExport = exportMetrics(requestHistory);

// Exportar como CSV
const csvExport = exportMetricsCSV(requestHistory);
```

### Métricas Disponibles

- **Total de requests**: Cantidad total enviados
- **Tasa de éxito**: Porcentaje de requests exitosos
- **Duración promedio**: Tiempo promedio de respuesta
- **Percentiles**: P50, P95, P99
- **Distribución de estados**: Conteo por código HTTP
- **Request rate**: Requests por segundo

## 🎨 Personalización

### Estilos CSS

Los componentes usan variables CSS para fácil personalización:

```css
:root {
  --color-primary: #3b82f6;
  --color-primary-rgb: 59, 130, 246;
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f9fafb;
  --color-bg-tertiary: #f3f4f6;
  --color-text-primary: #111827;
  --color-text-secondary: #6b7280;
  --color-border: #e5e7eb;
}
```

### Extender Funcionalidad

Para agregar nuevo generador de código:

```typescript
// src/utils/api-explorer/code-generation/generators.ts

export function generateRust(request: APIRequest): string {
  // Implementación para Rust
  return rustCode;
}

// Agregar a availableLanguages
export const availableLanguages = [
  // ... existing
  { id: "rust", name: "Rust" },
];
```

## 🧪 Testing

### Validación de Parámetros

```typescript
import { validateRequestParameters } from "@/utils/api-explorer/validation/param-validator";

const result = validateRequestParameters(endpoint, {
  pathParams: { id: 1 },
  queryParams: { page: 1, limit: 10 },
  body: { name: "Test" },
});

if (!result.valid) {
  console.error("Validation errors:", result.errors);
}
```

### Testing de Cliente HTTP

```typescript
import { apiClient } from "@/utils/api-explorer/client/api-client";

// Test endpoint connectivity
const connectivity = await apiClient.testEndpoint("https://api.example.com");

// Execute with retry
const result = await apiClient.executeWithRetry(request, 3, 1000);
```

## 🚀 Próximas Mejoras

### Features Planificadas

1. **Historial de Requests**
   - Guardar requests en localStorage
   - Replay de requests anteriores
   - Exportar historial completo

2. **Colecciones**
   - Agrupar endpoints relacionados
   - Compartir colecciones
   - Variables de entorno

3. **Testing Automatizado**
   - Assertions sobre respuestas
   - Test suites
   - CI/CD integration

4. **Colaboración**
   - Compartir requests via URL
   - Comentarios en endpoints
   - Team workspaces

5. **Visualizaciones**
   - Gráficos de performance
   - Dashboards de métricas
   - Comparación de endpoints

## 📦 Dependencias

- **Astro v5.14.1**: Framework principal
- **TypeScript 5.9.2**: Type safety
- **TailwindCSS v4.1.13**: Estilos (variables CSS)

No requiere dependencias externas para funcionalidad core.

## 📄 Licencia

Este componente es parte del portfolio personal y está disponible para uso en proyectos propios.

## 🤝 Contribuir

Para agregar nuevas APIs o mejorar funcionalidad:

1. Fork el repositorio
2. Crea una rama feature (`git checkout -b feature/nueva-api`)
3. Commit cambios (`git commit -m 'Add: Nueva API configuración'`)
4. Push a la rama (`git push origin feature/nueva-api`)
5. Abre un Pull Request

## 📞 Soporte

Para preguntas o issues:

- Abre un issue en GitHub
- Contacta al desarrollador

---

**Desarrollado con ❤️ usando Astro, TypeScript y arquitectura desacoplada**
