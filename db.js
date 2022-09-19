import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// connect to database (development or production)
const connectDB = async (NODE_ENV = 'development') => {
  let DB;
  if (NODE_ENV == 'development') {
    DB = process.env.DB_LOCAL;
  } else {
    DB = process.env.DB;
  }
  mongoose
    .connect(DB)
    .then(() => console.log('Database connection successful...'))
    .catch((err) => console.log(err));
};

export default connectDB;
