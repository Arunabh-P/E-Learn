import * as dotenv from 'dotenv';
import express from 'express';
import connectDb from './config/dbConnection.js';
import studentRoute from './routes/studentRoute.js';
import cookieParser from 'cookie-parser';

dotenv.config();

connectDb();

const app = express();

app.use(express.json());

app.use(cookieParser());

// routes
app.use('/api/students', studentRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running at port no : ${PORT}`);
});
