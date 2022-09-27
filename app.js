import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './db.js';
import cors from 'cors';

// import routes
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/category.js';

// import global controllers
import globalErrorHandler from './controllers/globalErrorHandler.js';
import notFound from './controllers/notFound.js';

// uncaughtException are placed above other function 
process.on('uncaughtException', (err) => {
  console.log(err);
  console.log('Server closed due to unhandled rejection');
  // closing server with other request gracefully
    process.exit(1);
});

dotenv.config();

const app = express();

// constants
const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// connect database (development or production)
connectDB(NODE_ENV);

// middlewares
app.use(express.json());
app.use(cors());

// dev logging middleware
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', categoryRoutes);

app.get('/api/v1', (req, res) => {
  res.json({ message: 'Hello World' });
});

// all request handler (for 404)
app.all('*', notFound);

app.use(globalErrorHandler);

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

process.on('unhandledRejection', (err) => {
  console.log(err);
  console.log('Server closed due to unhandled rejection');
  // closing server with other request gracefully
  server.close(() => {
    process.exit(1);
  })
});
