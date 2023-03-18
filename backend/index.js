import * as dotenv from 'dotenv';
import express from 'express';
import connectDb from './config/dbConnection.js';

dotenv.config();

connectDb();

const app = express();

app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running at port no : ${PORT}`);
});
