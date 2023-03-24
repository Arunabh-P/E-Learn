import express from 'express';
import {
  createDepartment,
  addStudentToDeparttment,
} from '../controller/departmentController.js';
import { isTeacher } from '../middlewares/authMiddlewares.js';
const router = express.Router();

router.post('/addDepartment', isTeacher, createDepartment);
router.post('/:id', isTeacher, addStudentToDeparttment);

export default router;
