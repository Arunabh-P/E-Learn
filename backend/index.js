import * as dotenv from 'dotenv';
import express from 'express';
import connectDb from './config/dbConnection.js';
import studentRoute from './routes/studentRoute.js';
import teacherRoute from './routes/teacherRoutes.js';
import departmentRoute from './routes/departmentRoute.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

connectDb();

const app = express();

app.use(cors());
app.use(express.json());

app.use(cookieParser());

// routes
app.use('/api/students', studentRoute);
app.use('/api/teachers', teacherRoute);
app.use('/api/department', departmentRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running at port no : ${PORT}`);
});
