import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './db.js';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

// import documentation framework
import swaggerDocs from './swagger.js';


// import routes
import authRoutes from './routes/auth.js';
import postRoutes from './routes/post.js';
import tagRoutes from './routes/tag.js';
import mediaRoutes from './routes/media.js';
import userRoutes from './routes/user.js';
import commentRoutes from './routes/comment.js';
import statsRoutes from './routes/stats.js';
import youtubeRoutes from './routes/youtube.js';


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

// TODO: add limiter
// app.use('/api', limiter);
app.use(express.json({ limit: "5mb", type: "application/json" }));
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(mongoSanitize());
app.use(xss());

// dev logging middleware
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', postRoutes);
app.use('/api/v1', tagRoutes);
app.use("/api/v1", mediaRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", commentRoutes);
app.use("/api/v1", statsRoutes);
app.use("/api/v1/youtube", youtubeRoutes);

// documentation url (/docs)
swaggerDocs(app, PORT);

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
