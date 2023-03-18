import express from 'express';
import { createDepartment } from '../controller/departmentController.js';
import { isTeacher } from '../middlewares/authMiddlewares.js';
const router = express.Router();

router.post('/addDepartment', isTeacher, createDepartment);

export default router;
