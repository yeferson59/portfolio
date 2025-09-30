/**
 * FastAPI Professional Template Configuration
 * Production-ready Python API template
 */

import type { APIConfiguration } from '../types';

export const fastapiTemplateConfig: APIConfiguration = {
  id: 'fastapi-template',
  name: 'FastAPI Template',
  baseUrl: 'https://api.fastapi-template.example.com/api/v1',
  version: '1.0.0',
  description: 'Professional FastAPI template with SQLModel, async operations, Docker deployment, and comprehensive testing suite.',
  documentation: 'https://docs.fastapi-template.example.com',
  repositoryUrl: 'https://github.com/yourusername/fastapi-professional-template',

  authentication: {
    type: 'bearer',
    required: true,
    tokenEndpoint: '/auth/token',
    description: 'OAuth2 password bearer token',
    placeholder: 'your-access-token-here',
  },

  globalHeaders: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },

  categories: ['Authentication', 'Users', 'Items', 'Health'],

  rateLimit: {
    requests: 60,
    period: '1 minute',
  },

  endpoints: [
    // Health Check
    {
      id: 'health-check',
      name: 'Health Check',
      method: 'GET',
      path: '/health',
      category: 'Health',
      description: 'Check API health status and database connectivity',
      authentication: {
        type: 'none',
        required: false,
      },
      examples: [
        {
          response: {
            status: 200,
            body: {
              status: 'healthy',
              version: '1.0.0',
              database: 'connected',
              uptime: 86400,
            },
          },
        },
      ],
    },

    // Authentication
    {
      id: 'get-token',
      name: 'Get Access Token',
      method: 'POST',
      path: '/auth/token',
      category: 'Authentication',
      description: 'Obtain OAuth2 access token using credentials',
      authentication: {
        type: 'none',
        required: false,
      },
      parameters: {
        body: {
          type: 'formData',
          description: 'OAuth2 form data',
          schema: {
            username: {
              type: 'string',
              required: true,
              description: 'User email or username',
              example: 'admin@example.com',
            },
            password: {
              type: 'string',
              required: true,
              description: 'User password',
              example: 'admin123',
            },
            grant_type: {
              type: 'string',
              default: 'password',
              description: 'OAuth2 grant type',
            },
          },
        },
        headers: {
          'Content-Type': {
            type: 'string',
            default: 'application/x-www-form-urlencoded',
            description: 'Content type for form data',
          },
        },
      },
      examples: [
        {
          request: {
            body: {
              username: 'admin@example.com',
              password: 'admin123',
              grant_type: 'password',
            },
          },
          response: {
            status: 200,
            body: {
              access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              token_type: 'bearer',
              expires_in: 3600,
            },
          },
        },
      ],
    },

    // Users
    {
      id: 'get-users',
      name: 'List Users',
      method: 'GET',
      path: '/users',
      category: 'Users',
      description: 'Get paginated list of users',
      authentication: {
        type: 'bearer',
        required: true,
      },
      parameters: {
        query: {
          skip: {
            type: 'integer',
            default: 0,
            min: 0,
            description: 'Number of records to skip',
          },
          limit: {
            type: 'integer',
            default: 100,
            min: 1,
            max: 100,
            description: 'Maximum number of records to return',
          },
        },
      },
      examples: [
        {
          request: {
            query: { skip: 0, limit: 10 },
          },
          response: {
            status: 200,
            body: [
              {
                id: 1,
                email: 'user@example.com',
                full_name: 'John Doe',
                is_active: true,
                is_superuser: false,
                created_at: '2025-01-01T00:00:00Z',
              },
            ],
          },
        },
      ],
    },

    {
      id: 'create-user',
      name: 'Create User',
      method: 'POST',
      path: '/users',
      category: 'Users',
      description: 'Create a new user account',
      authentication: {
        type: 'bearer',
        required: true,
      },
      parameters: {
        body: {
          type: 'json',
          schema: {
            email: {
              type: 'string',
              required: true,
              pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
              description: 'User email address',
              example: 'newuser@example.com',
            },
            password: {
              type: 'string',
              required: true,
              min: 8,
              description: 'User password (minimum 8 characters)',
              example: 'SecurePass123!',
            },
            full_name: {
              type: 'string',
              required: false,
              description: 'User full name',
              example: 'Jane Smith',
            },
            is_active: {
              type: 'boolean',
              default: true,
              description: 'Whether user account is active',
            },
            is_superuser: {
              type: 'boolean',
              default: false,
              description: 'Whether user has superuser privileges',
            },
          },
          example: {
            email: 'newuser@example.com',
            password: 'SecurePass123!',
            full_name: 'Jane Smith',
            is_active: true,
            is_superuser: false,
          },
        },
      },
    },

    {
      id: 'get-user-me',
      name: 'Get Current User',
      method: 'GET',
      path: '/users/me',
      category: 'Users',
      description: 'Get currently authenticated user information',
      authentication: {
        type: 'bearer',
        required: true,
      },
      examples: [
        {
          response: {
            status: 200,
            body: {
              id: 1,
              email: 'user@example.com',
              full_name: 'John Doe',
              is_active: true,
              is_superuser: false,
            },
          },
        },
      ],
    },

    {
      id: 'update-user-me',
      name: 'Update Current User',
      method: 'PUT',
      path: '/users/me',
      category: 'Users',
      description: 'Update currently authenticated user information',
      authentication: {
        type: 'bearer',
        required: true,
      },
      parameters: {
        body: {
          type: 'json',
          schema: {
            full_name: {
              type: 'string',
              required: false,
              description: 'Updated full name',
            },
            email: {
              type: 'string',
              required: false,
              description: 'Updated email address',
            },
            password: {
              type: 'string',
              required: false,
              min: 8,
              description: 'New password',
            },
          },
        },
      },
    },

    {
      id: 'get-user-by-id',
      name: 'Get User by ID',
      method: 'GET',
      path: '/users/{user_id}',
      category: 'Users',
      description: 'Get specific user by ID',
      authentication: {
        type: 'bearer',
        required: true,
      },
      parameters: {
        path: {
          user_id: {
            type: 'integer',
            required: true,
            description: 'User ID',
            example: 1,
          },
        },
      },
    },

    // Items
    {
      id: 'get-items',
      name: 'List Items',
      method: 'GET',
      path: '/items',
      category: 'Items',
      description: 'Get paginated list of items',
      authentication: {
        type: 'bearer',
        required: true,
      },
      parameters: {
        query: {
          skip: {
            type: 'integer',
            default: 0,
            description: 'Number of records to skip',
          },
          limit: {
            type: 'integer',
            default: 100,
            max: 100,
            description: 'Maximum number of records',
          },
        },
      },
    },

    {
      id: 'create-item',
      name: 'Create Item',
      method: 'POST',
      path: '/items',
      category: 'Items',
      description: 'Create a new item',
      authentication: {
        type: 'bearer',
        required: true,
      },
      parameters: {
        body: {
          type: 'json',
          schema: {
            title: {
              type: 'string',
              required: true,
              description: 'Item title',
              example: 'My New Item',
            },
            description: {
              type: 'string',
              required: false,
              description: 'Item description',
              example: 'This is a sample item',
            },
          },
          example: {
            title: 'My New Item',
            description: 'This is a sample item',
          },
        },
      },
    },

    {
      id: 'get-item-by-id',
      name: 'Get Item by ID',
      method: 'GET',
      path: '/items/{item_id}',
      category: 'Items',
      description: 'Get specific item by ID',
      authentication: {
        type: 'bearer',
        required: true,
      },
      parameters: {
        path: {
          item_id: {
            type: 'integer',
            required: true,
            description: 'Item ID',
            example: 1,
          },
        },
      },
    },

    {
      id: 'update-item',
      name: 'Update Item',
      method: 'PUT',
      path: '/items/{item_id}',
      category: 'Items',
      description: 'Update existing item',
      authentication: {
        type: 'bearer',
        required: true,
      },
      parameters: {
        path: {
          item_id: {
            type: 'integer',
            required: true,
            description: 'Item ID',
          },
        },
        body: {
          type: 'json',
          schema: {
            title: {
              type: 'string',
              required: false,
              description: 'Updated title',
            },
            description: {
              type: 'string',
              required: false,
              description: 'Updated description',
            },
          },
        },
      },
    },

    {
      id: 'delete-item',
      name: 'Delete Item',
      method: 'DELETE',
      path: '/items/{item_id}',
      category: 'Items',
      description: 'Delete an item',
      authentication: {
        type: 'bearer',
        required: true,
      },
      parameters: {
        path: {
          item_id: {
            type: 'integer',
            required: true,
            description: 'Item ID to delete',
          },
        },
      },
    },
  ],
};
