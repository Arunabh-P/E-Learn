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
} from '../controller/teacherController.js';

router.post('/login', teacherLogin);
router.get('/logout', isTeacher, logoutTeacher);
router.get('/departments', getDepartments);
router.get('/departments/:id', getOneDepartment);

router.post('/register', isAdmin, createTeacher);
router.get('/allTeachers', getAllTeachers);
router.get('/:id', getATeacher);

export default router;
