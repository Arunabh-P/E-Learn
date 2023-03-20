import express from 'express';
import {
  createDepartment,
  addStudentToDeparttment,
  getADepartment,
  getAllDepartments,
} from '../controller/departmentController.js';
import { isTeacher } from '../middlewares/authMiddlewares.js';
const router = express.Router();

router.post('/addDepartment', isTeacher, createDepartment);
router.post('/:id', isTeacher, addStudentToDeparttment);
router.get('/allDepartments', isTeacher, getAllDepartments);
router.get('/:id', isTeacher, getADepartment);

export default router;
