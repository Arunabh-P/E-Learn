import * as dotenv from 'dotenv';
import express from 'express';
import connectDb from './config/dbConnection.js';
import studentRoute from './routes/studentRoute.js';
import teacherRoute from './routes/teacherRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
dotenv.config();

connectDb();

const app = express();

app.use(express.json());
// app.use(cookieParser());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser('SECERT'));

// app.use(express.urlencoded({ extended: true }));

// const corsOptions = {
//   credentials: true,
//   origin: '*',
// };

// app.use(cors(corsOptions));
app.use(cors({ origin: true, credentials: true }));

// routes
app.use('/api/students', studentRoute);
app.use('/api/teacher', teacherRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running at port no : ${PORT}`);
});
