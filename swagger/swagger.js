import swaggerJSDoc from 'swagger-jsdoc';

const option = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Inventory Management API',
      description:
        'API for managing category, product allowing users to create, read, and manage inventory.',
      version: '1.0.0',
    },
    tags: [
      {
        name: 'Category',
        description: 'Category management operations',
      },
      {
        name: 'Product',
        description: 'Product management operations',
      },
    ],
    host: 'localhost:5000',
    basePath: '/',
    schemes: ['http'],
    paths: {
      '/category': {
        get: {
          tags: ['Category'],
          description: '',
          parameters: [
            {
              name: 'name',
              in: 'query',
              required: false,
              schema: { type: 'string' },
              description: 'Filter categories by name.',
            },
            {
              name: 'description',
              in: 'query',
              required: false,
              schema: { type: 'string' },
              description: 'Filter categories by description.',
            },
          ],
          responses: {
            200: {
              description: 'OK',
            },
            500: {
              description: 'Internal Server Error',
            },
          },
        },
        post: {
          tags: ['Category'],
          description: '',
          responses: {
            201: {
              description: 'Created',
            },
            400: {
              description: 'Bad Request',
            },
            500: {
              description: 'Internal Server Error',
            },
          },
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name'],
                  properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
      '/category/{id}': {
        get: {
          tags: ['Category'],
          description: '',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              type: 'string',
            },
          ],
          responses: {
            200: {
              description: 'OK',
            },
            404: {
              description: 'Not Found',
            },
            500: {
              description: 'Internal Server Error',
            },
          },
        },
        put: {
          tags: ['Category'],
          description: '',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              type: 'string',
            },
          ],
          responses: {
            200: {
              description: 'OK',
            },
            400: {
              description: 'Bad Request',
            },
            500: {
              description: 'Internal Server Error',
            },
          },
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name'],
                  properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ['Category'],
          description: '',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              type: 'string',
            },
          ],
          responses: {
            200: {
              description: 'OK',
            },
            404: {
              description: 'Not Found',
            },
            500: {
              description: 'Internal Server Error',
            },
          },
        },
      },
      '/product': {
        get: {
          tags: ['Product'],
          description: 'Get all products',
          parameters: [
            {
              name: 'name',
              in: 'query',
              required: false,
              schema: { type: 'string' },
              description: 'Filter products by name.',
            },
            {
              name: 'sku',
              in: 'query',
              required: false,
              schema: { type: 'string' },
              description: 'Filter products by SKU.',
            },
            {
              name: 'categoryId',
              in: 'query',
              required: false,
              schema: { type: 'string', pattern: '^[a-fA-F0-9]{24}$' },
              description: 'Filter products by category ID.',
            },
            {
              name: 'supplier',
              in: 'query',
              required: false,
              schema: { type: 'string' },
              description: 'Filter products by supplier.',
            },
            {
              name: 'status',
              in: 'query',
              required: false,
              schema: { type: 'string', enum: ['in-stock', 'out-of-stock'] },
              description: 'Filter products by stock status.',
            },
            {
              name: 'minPrice',
              in: 'query',
              required: false,
              schema: { type: 'number', minimum: 0 },
              description: 'Minimum product price.',
            },
            {
              name: 'maxPrice',
              in: 'query',
              required: false,
              schema: { type: 'number', minimum: 0 },
              description: 'Maximum product price.',
            },
            {
              name: 'minQuantity',
              in: 'query',
              required: false,
              schema: { type: 'integer', minimum: 0 },
              description: 'Minimum product quantity.',
            },
            {
              name: 'maxQuantity',
              in: 'query',
              required: false,
              schema: { type: 'integer', minimum: 0 },
              description: 'Maximum product quantity.',
            },
          ],
          responses: {
            200: {
              description: 'OK',
            },
            500: {
              description: 'Internal Server Error',
            },
          },
        },
        post: {
          tags: ['Product'],
          description: 'Create a product',
          responses: {
            201: {
              description: 'Created',
            },
            400: {
              description: 'Bad Request',
            },
            500: {
              description: 'Internal Server Error',
            },
          },
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: [
                    'name',
                    'sku',
                    'categoryId',
                    'price',
                    'quantity',
                    'supplier',
                    'status',
                  ],
                  properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    sku: { type: 'string' },
                    categoryId: { type: 'string' },
                    price: { type: 'number' },
                    quantity: { type: 'number' },
                    supplier: { type: 'string' },
                    status: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
      '/product/{id}': {
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        get: {
          tags: ['Product'],
          description: 'Get a product by ID',
          responses: {
            200: {
              description: 'OK',
            },
            404: {
              description: 'Not Found',
            },
            500: {
              description: 'Internal Server Error',
            },
          },
        },
        put: {
          tags: ['Product'],
          description: 'Update a product',
          responses: {
            201: {
              description: 'Updated',
            },
            400: {
              description: 'Bad Request',
            },
            500: {
              description: 'Internal Server Error',
            },
          },
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: [
                    'name',
                    'sku',
                    'categoryId',
                    'price',
                    'quantity',
                    'supplier',
                    'status',
                  ],
                  properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    sku: { type: 'string' },
                    categoryId: { type: 'string' },
                    price: { type: 'number' },
                    quantity: { type: 'number' },
                    supplier: { type: 'string' },
                    status: { type: 'string' },
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ['Product'],
          description: 'Delete a product',
          responses: {
            200: {
              description: 'OK',
            },
            404: {
              description: 'Not Found',
            },
            500: {
              description: 'Internal Server Error',
            },
          },
        },
      },
    },
    definitions: {
      category: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            example: 'object',
          },
          required: {
            type: 'array',
            example: ['name', 'description'],
            items: {
              type: 'string',
            },
          },
          properties: {
            type: 'object',
            properties: {
              name: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    example: 'string',
                  },
                  example: {
                    type: 'string',
                    example: 'John',
                  },
                },
              },
              description: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    example: 'string',
                  },
                  example: {
                    type: 'string',
                    example: 'Doe',
                  },
                },
              },
              email: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    example: 'string',
                  },
                  format: {
                    type: 'string',
                    example: 'email',
                  },
                  example: {
                    type: 'string',
                    example: 'john@example.com',
                  },
                },
              },
              favoriteColor: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    example: 'string',
                  },
                  example: {
                    type: 'string',
                    example: 'blue',
                  },
                },
              },
              birthday: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    example: 'string',
                  },
                  format: {
                    type: 'string',
                    example: 'date',
                  },
                  example: {
                    type: 'string',
                    example: '1990-01-01',
                  },
                },
              },
            },
          },
        },
      },
      UpdateUser: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            example: 'object',
          },
          properties: {
            type: 'object',
            properties: {
              _id: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    example: 'string',
                  },
                  example: {
                    type: 'string',
                    example: 'user_id',
                  },
                },
              },
              firstName: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    example: 'string',
                  },
                  example: {
                    type: 'string',
                    example: 'John',
                  },
                },
              },
              lastName: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    example: 'string',
                  },
                  example: {
                    type: 'string',
                    example: 'Doe',
                  },
                },
              },
              email: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    example: 'string',
                  },
                  format: {
                    type: 'string',
                    example: 'email',
                  },
                  example: {
                    type: 'string',
                    example: 'john@example.com',
                  },
                },
              },
              favoriteColor: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    example: 'string',
                  },
                  example: {
                    type: 'string',
                    example: 'blue',
                  },
                },
              },
              birthday: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    example: 'string',
                  },
                  format: {
                    type: 'string',
                    example: 'date',
                  },
                  example: {
                    type: 'string',
                    example: '1990-01-01',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerDoc = swaggerJSDoc(option);
