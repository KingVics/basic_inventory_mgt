import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { getConnection } from './db/connect.js';
import categoryRouter from './route/category.js';
import productRouter from './route/product.js';
import createHttpError from 'http-errors';
import { errorHandler } from './middleware/errorHandler.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerDoc } from './swagger/swagger.js';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Use the userRoute for handling requests to /users
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.get('/api/v1/docs.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDoc);
});
app.use('/category', categoryRouter);
app.use('/product', productRouter);

// ---------- 404 ----------
app.use((req, res, next) => {
  next(createHttpError(404, 'Route not found'));
});

app.use(errorHandler);

// Start the server after establishing a database connection
const startServer = async () => {
  try {
    console.log('🔄 Initializing database connection...');
    await getConnection();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start the server:', error);
    process.exit(1);
  }
};

startServer();
