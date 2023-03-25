import express from 'express';
const router = express.Router();

import { isAdmin, isTeacher } from '../middlewares/authMiddlewares.js';
import {
  createTeacher,
  teacherLogin,
  logoutTeacher,
  getAllTeachers,
  getATeacher,
  getDepartments,
  getOneDepartment,
  getStudents,
  getStudentById,
} from '../controller/teacherController.js';

router.post('/login', teacherLogin);
router.get('/logout', isTeacher, logoutTeacher);
router.get('/departments', getDepartments);
router.get('/departments/:id', getOneDepartment);
router.get('/students', getStudents);
router.get('/students/:id', getStudentById);

router.post('/register', isAdmin, createTeacher);
router.get('/allTeachers', getAllTeachers);
router.get('/:id', getATeacher);

export default router;
