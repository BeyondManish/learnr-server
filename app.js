import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './db.js';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

// import routes
import authRoutes from './routes/auth.js';
import postRoutes from './routes/post.js';
import categoryRoutes from './routes/category.js';
import fileRoutes from './routes/files.js';

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

const limiter = rateLimit({
  max: 50,
  windowMs: 10 * 60 * 1000,
  message: "Too many request from this IP, please try again after 10 minutes"
});

// middlewares
app.use(helmet()); // set security HTTP headers
app.use('/api', limiter);
app.use(express.json({ limit: "5mb", type: "application/json" }));
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(mongoSanitize());
app.use(xss());

// TODO: Protect against HTTP parameter pollution (hpp package and whitelist some api features) 

// dev logging middleware
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1', categoryRoutes);
app.use("/api/v1", fileRoutes);

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
  });
});
