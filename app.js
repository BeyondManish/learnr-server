import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './db.js';

dotenv.config();

const app = express();

// constants
const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// connect database (development or production)
connectDB(NODE_ENV);

// dev logging middleware
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

export default app;
