/**
 * E-commerce API Configuration
 * Scalable backend with microservices architecture
 */

import type { APIConfiguration } from "../types";
import {
  authConfigs,
  globalHeaders,
  rateLimits,
  queryParams,
} from "./shared-configs";

export const ecommerceAPIConfig: APIConfiguration = {
  id: "ecommerce-api",
  name: "E-commerce API",
  baseUrl: "https://api.ecommerce-demo.example.com/v1",
  version: "1.0.0",
  description:
    "Complete e-commerce backend with microservices architecture, Redis caching, and JWT authentication. Handles 2,800+ RPS with sub-100ms response times.",
  documentation: "https://docs.ecommerce-demo.example.com",
  repositoryUrl: "https://github.com/yourusername/ecommerce-api",

  authentication: authConfigs.bearer("/auth/login", "JWT token obtained from login endpoint"),

  globalHeaders: globalHeaders.json,

  categories: [
    "Authentication",
    "Products",
    "Orders",
    "Users",
    "Cart",
    "Payments",
  ],

  rateLimit: rateLimits.standard,

  endpoints: [
    // Authentication Endpoints
    {
      id: "auth-login",
      name: "User Login",
      method: "POST",
      path: "/auth/login",
      category: "Authentication",
      description: "Authenticate user and receive JWT token",
      authentication: authConfigs.none(),
      parameters: {
        body: {
          type: "json",
          description: "Login credentials",
          schema: {
            email: {
              type: "string",
              description: "User email address",
              required: true,
              pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
              example: "user@example.com",
            },
            password: {
              type: "string",
              description: "User password",
              required: true,
              min: 8,
              example: "SecurePass123!",
            },
          },
          example: {
            email: "demo@example.com",
            password: "DemoPass123!",
          },
        },
      },
      examples: [
        {
          request: {
            body: {
              email: "demo@example.com",
              password: "DemoPass123!",
            },
          },
          response: {
            status: 200,
            body: {
              success: true,
              data: {
                token:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
                expiresIn: 3600,
                user: {
                  id: 1,
                  email: "demo@example.com",
                  name: "Demo User",
                },
              },
            },
          },
        },
      ],
    },

    {
      id: "auth-register",
      name: "User Registration",
      method: "POST",
      path: "/auth/register",
      category: "Authentication",
      description: "Register a new user account",
      authentication: authConfigs.none(),
      parameters: {
        body: {
          type: "json",
          schema: {
            email: {
              type: "string",
              required: true,
              pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
              description: "User email",
            },
            password: {
              type: "string",
              required: true,
              min: 8,
              description: "User password (min 8 characters)",
            },
            name: {
              type: "string",
              required: true,
              description: "User full name",
            },
          },
          example: {
            email: "newuser@example.com",
            password: "SecurePass123!",
            name: "New User",
          },
        },
      },
    },

    // Products Endpoints
    {
      id: "get-products",
      name: "Get Products",
      method: "GET",
      path: "/products",
      category: "Products",
      description:
        "Retrieve paginated list of products with optional filtering",
      authentication: authConfigs.optionalBearer(),
      parameters: {
        query: {
          ...queryParams.pagination,
          category: {
            type: "string",
            required: false,
            description: "Filter by category slug",
            example: "electronics",
          },
          search: {
            type: "string",
            required: false,
            description: "Search products by name or description",
            example: "laptop",
          },
          minPrice: {
            type: "number",
            required: false,
            min: 0,
            description: "Minimum price filter",
            example: 100,
          },
          maxPrice: {
            type: "number",
            required: false,
            description: "Maximum price filter",
            example: 1000,
          },
          sortBy: {
            type: "string",
            enum: ["price", "name", "createdAt", "popularity"],
            default: "createdAt",
            description: "Sort field",
          },
          order: {
            type: "string",
            enum: ["asc", "desc"],
            default: "desc",
            description: "Sort order",
          },
        },
      },
      examples: [
        {
          request: {
            query: {
              page: 1,
              limit: 10,
              category: "electronics",
            },
          },
          response: {
            status: 200,
            body: {
              success: true,
              data: [
                {
                  id: 1,
                  name: "Laptop Pro 15",
                  description: "High-performance laptop for professionals",
                  price: 1299.99,
                  category: "electronics",
                  stock: 45,
                  imageUrl: "https://example.com/images/laptop.jpg",
                  createdAt: "2025-01-15T10:00:00Z",
                },
              ],
              meta: {
                total: 150,
                page: 1,
                limit: 10,
                totalPages: 15,
              },
            },
          },
        },
      ],
    },

    {
      id: "get-product-by-id",
      name: "Get Product by ID",
      method: "GET",
      path: "/products/{id}",
      category: "Products",
      description: "Get detailed information about a specific product",
      parameters: {
        path: {
          id: {
            type: "integer",
            required: true,
            description: "Product ID",
            example: 1,
          },
        },
      },
      examples: [
        {
          request: {
            path: { id: 1 },
          },
          response: {
            status: 200,
            body: {
              success: true,
              data: {
                id: 1,
                name: "Laptop Pro 15",
                description: "High-performance laptop for professionals",
                price: 1299.99,
                category: "electronics",
                stock: 45,
                specifications: {
                  cpu: "Intel Core i7",
                  ram: "16GB",
                  storage: "512GB SSD",
                },
                reviews: {
                  average: 4.5,
                  count: 128,
                },
              },
            },
          },
        },
      ],
    },

    // Orders Endpoints
    {
      id: "create-order",
      name: "Create Order",
      method: "POST",
      path: "/orders",
      category: "Orders",
      description: "Create a new order from cart items",
      authentication: authConfigs.bearer(),
      parameters: {
        body: {
          type: "json",
          schema: {
            items: {
              type: "array",
              required: true,
              description: "Array of order items",
            },
            shippingAddress: {
              type: "object",
              required: true,
              description: "Shipping address details",
            },
            paymentMethod: {
              type: "string",
              enum: ["credit_card", "paypal", "stripe"],
              required: true,
              description: "Payment method",
            },
          },
          example: {
            items: [
              { productId: 1, quantity: 2 },
              { productId: 5, quantity: 1 },
            ],
            shippingAddress: {
              street: "123 Main St",
              city: "New York",
              state: "NY",
              zipCode: "10001",
              country: "USA",
            },
            paymentMethod: "credit_card",
          },
        },
      },
    },

    {
      id: "get-orders",
      name: "Get User Orders",
      method: "GET",
      path: "/orders",
      category: "Orders",
      description: "Get all orders for authenticated user",
      authentication: authConfigs.bearer(),
      parameters: {
        query: {
          status: {
            type: "string",
            enum: [
              "pending",
              "processing",
              "shipped",
              "delivered",
              "cancelled",
            ],
            required: false,
            description: "Filter by order status",
          },
          ...queryParams.pagination,
        },
      },
    },

    // Cart Endpoints
    {
      id: "get-cart",
      name: "Get Cart",
      method: "GET",
      path: "/cart",
      category: "Cart",
      description: "Get current user cart",
      authentication: authConfigs.bearer(),
    },

    {
      id: "add-to-cart",
      name: "Add to Cart",
      method: "POST",
      path: "/cart/items",
      category: "Cart",
      description: "Add product to cart",
      authentication: authConfigs.bearer(),
      parameters: {
        body: {
          type: "json",
          schema: {
            productId: {
              type: "integer",
              required: true,
              description: "Product ID to add",
            },
            quantity: {
              type: "integer",
              required: true,
              min: 1,
              description: "Quantity to add",
            },
          },
          example: {
            productId: 1,
            quantity: 2,
          },
        },
      },
    },

    // User Profile
    {
      id: "get-profile",
      name: "Get User Profile",
      method: "GET",
      path: "/users/me",
      category: "Users",
      description: "Get authenticated user profile",
      authentication: authConfigs.bearer(),
    },

    {
      id: "update-profile",
      name: "Update Profile",
      method: "PUT",
      path: "/users/me",
      category: "Users",
      description: "Update user profile information",
      authentication: authConfigs.bearer(),
      parameters: {
        body: {
          type: "json",
          schema: {
            name: {
              type: "string",
              required: false,
              description: "User full name",
            },
            phone: {
              type: "string",
              required: false,
              description: "Phone number",
            },
            avatar: {
              type: "string",
              required: false,
              description: "Avatar URL",
            },
          },
        },
      },
    },
  ],
};
