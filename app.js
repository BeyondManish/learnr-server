import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './db.js';
import cors from 'cors';

// import routes
import authRoutes from './routes/auth/auth.js';

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

app.get('/api/v1', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

export default app;
