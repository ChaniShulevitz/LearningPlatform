import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';
import subCategoryRoutes from './routes/subCategoryRoutes';
import promptRoutes from './routes/promptRoutes';
import { errorHandler } from './middlewares/errorMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI Platform API Documentation',
      version: '1.0.0',
      description: 'מערכת פרומפטים וקטגוריות מבוססת בינה מלאכותית',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    paths: {
      '/api/users/register': {
        post: {
          summary: 'Register a new user',
          tags: ['Users'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'email', 'password', 'phone'],
                  properties: {
                    name: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' },
                    phone: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'User registered successfully' }
          }
        }
      },
      '/api/users/login': {
        post: {
          summary: 'Login user',
          tags: ['Users'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: { type: 'string' },
                    password: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Login successful' }
          }
        }
      },
      '/api/users/admin/users': {
        get: {
          summary: 'Get all users with their history (Admin Only)',
          tags: ['Users'],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'List of all users retrieved successfully' }
          }
        }
      },
      '/api/categories': {
        get: {
          summary: 'Get all available categories',
          tags: ['Categories'],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'List of categories retrieved successfully' }
          }
        },
        post: {
          summary: 'Create a new category (Admin Only)',
          tags: ['Categories'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name'],
                  properties: {
                    name: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'Category created successfully' }
          }
        }
      },
      '/api/subcategories': {
        post: {
          summary: 'Create a new sub-category (Admin Only)',
          tags: ['SubCategories'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['category_id', 'name'],
                  properties: {
                    category_id: { type: 'string' },
                    name: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'Sub-category created successfully' }
          }
        }
      },
      '/api/subcategories/{categoryId}': {
        get: {
          summary: 'Get sub-categories by category ID',
          tags: ['SubCategories'],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'categoryId',
              required: true,
              schema: { type: 'string' }
            }
          ],
          responses: {
            200: { description: 'List of sub-categories retrieved successfully' }
          }
        }
      },
      '/api/prompts': {
        post: {
          summary: 'Generate an AI response and save the prompt',
          tags: ['Prompts'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['category_id', 'prompt'],
                  properties: {
                    category_id: { type: 'string' },
                    sub_category_id: { type: 'string' },
                    prompt: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'AI response generated successfully' }
          }
        }
      },
      '/api/prompts/history': {
        get: {
          summary: "Get current user's prompt history",
          tags: ['Prompts'],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Learning history retrieved successfully' }
          }
        }
      }
    }
  },
  apis: [], // מרוקנים את זה כדי שלא יסרוק קבצים ויקרוס שוב
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/prompts', promptRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Learning Platform API! 🚀" });
});

app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
  });
});

export default app;